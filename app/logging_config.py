import logging
import json
import os
import time
import uuid
from datetime import datetime, timezone
from logging.handlers import RotatingFileHandler

from flask import g, request


LOG_FORMAT = '%(asctime)s %(levelname)s [%(name)s] %(message)s'
ACCESS_LOG_FORMAT = (
    '%(asctime)s %(levelname)s [%(name)s] '
    '%(remote_addr)s "%(method)s %(path)s" %(status_code)s '
    '%(duration_ms).2fms request_id=%(request_id)s'
)


def _ensure_log_dir(path):
    os.makedirs(path, exist_ok=True)


def _already_configured(logger, handler_name):
    return any(getattr(handler, '_lqd_handler_name', None) == handler_name for handler in logger.handlers)


def _build_rotating_handler(path, handler_name, formatter, max_bytes, backup_count):
    handler = RotatingFileHandler(
        path,
        maxBytes=max_bytes,
        backupCount=backup_count,
        encoding='utf-8',
    )
    handler.setFormatter(formatter)
    handler._lqd_handler_name = handler_name
    return handler


def setup_logging(app):
    log_dir = app.config['LOG_DIR']
    log_level = getattr(logging, str(app.config['LOG_LEVEL']).upper(), logging.INFO)
    max_bytes = int(app.config['LOG_MAX_BYTES'])
    backup_count = int(app.config['LOG_BACKUP_COUNT'])

    _ensure_log_dir(log_dir)

    app_log_path = os.path.join(log_dir, 'app.log')
    access_log_path = os.path.join(log_dir, 'access.log')
    events_log_path = os.path.join(log_dir, 'events.log')

    formatter = logging.Formatter(LOG_FORMAT)
    app_handler = _build_rotating_handler(
        app_log_path,
        'lqd_app_file',
        formatter,
        max_bytes,
        backup_count,
    )
    app_handler.setLevel(log_level)

    root_logger = logging.getLogger()
    root_logger.setLevel(log_level)
    if not _already_configured(root_logger, 'lqd_app_file'):
        root_logger.addHandler(app_handler)

    app.logger.setLevel(log_level)

    access_logger = logging.getLogger('lqd.access')
    access_logger.setLevel(logging.INFO)
    access_logger.propagate = False
    if not _already_configured(access_logger, 'lqd_access_file'):
        access_handler = _build_rotating_handler(
            access_log_path,
            'lqd_access_file',
            logging.Formatter(ACCESS_LOG_FORMAT),
            max_bytes,
            backup_count,
        )
        access_handler.setLevel(logging.INFO)
        access_logger.addHandler(access_handler)

    logging.getLogger('werkzeug').setLevel(logging.WARNING)
    logging.getLogger('waitress').setLevel(logging.INFO)

    event_logger = logging.getLogger('lqd.events')
    event_logger.setLevel(logging.INFO)
    event_logger.propagate = False
    if not _already_configured(event_logger, 'lqd_events_file'):
        event_handler = _build_rotating_handler(
            events_log_path,
            'lqd_events_file',
            logging.Formatter('%(message)s'),
            max_bytes,
            backup_count,
        )
        event_handler.setLevel(logging.INFO)
        event_logger.addHandler(event_handler)

    app.logger.info(
        'Logging initialized log_dir=%s level=%s max_bytes=%s backup_count=%s',
        log_dir,
        logging.getLevelName(log_level),
        max_bytes,
        backup_count,
    )


def register_request_logging(app):
    access_logger = logging.getLogger('lqd.access')

    @app.before_request
    def start_request_log_context():
        g.request_start_time = time.perf_counter()
        g.request_id = request.headers.get('X-Request-ID') or uuid.uuid4().hex[:12]

    @app.after_request
    def write_access_log(response):
        if app.config.get('ACCESS_LOG_ENABLED', True) and request.endpoint != 'static':
            duration_ms = (time.perf_counter() - g.get('request_start_time', time.perf_counter())) * 1000
            user_context = _get_user_context()
            access_logger.info(
                'request completed',
                extra={
                    'remote_addr': request.headers.get('X-Forwarded-For', request.remote_addr or '-'),
                    'method': request.method,
                    'path': request.full_path.rstrip('?'),
                    'status_code': response.status_code,
                    'duration_ms': duration_ms,
                    'request_id': g.get('request_id', '-'),
                },
            )
            if app.config.get('EVENT_LOG_ENABLED', True):
                log_event(
                    'request_completed',
                    request_id=g.get('request_id', '-'),
                    remote_addr=request.headers.get('X-Forwarded-For', request.remote_addr or '-'),
                    method=request.method,
                    path=request.full_path.rstrip('?'),
                    endpoint=request.endpoint,
                    status_code=response.status_code,
                    duration_ms=round(duration_ms, 2),
                    user=user_context,
                    response_summary=_build_response_summary(app, response),
                )
            response.headers['X-Request-ID'] = g.get('request_id', '-')
        return response

    @app.teardown_request
    def log_unhandled_exception(error=None):
        if error is not None:
            app.logger.exception(
                'Unhandled request exception method=%s path=%s request_id=%s',
                request.method,
                request.full_path.rstrip('?'),
                g.get('request_id', '-'),
                exc_info=error,
            )


def _utc_now_iso():
    return datetime.now(timezone.utc).isoformat(timespec='milliseconds')


def _truncate(value, max_len=300):
    text = str(value or '')
    if len(text) <= max_len:
        return text
    return text[:max_len] + '...'


def _get_user_context():
    from flask import current_app
    token = request.cookies.get(current_app.config.get('AUTH_COOKIE_NAME', 'token')) or request.headers.get('Authorization', '').replace('Bearer ', '')
    if not token:
        return None

    try:
        from app.services.auth_service import get_user_by_token
        user = get_user_by_token(token)
    except Exception:
        return {'authenticated': False}

    if not user:
        return {'authenticated': False}

    return {
        'authenticated': True,
        'user_id': user['id'],
        'username': user['username'],
        'role': user['role'],
    }


def _build_response_summary(app, response):
    if not app.config.get('RESPONSE_SUMMARY_LOG_ENABLED', True):
        return None
    if response.direct_passthrough:
        return {'type': 'stream_or_file'}
    if response.content_length and response.content_length > app.config.get('RESPONSE_SUMMARY_MAX_BYTES', 512 * 1024):
        return {'type': 'too_large', 'bytes': response.content_length}
    if not response.is_json:
        return {'type': response.mimetype or 'non_json', 'bytes': response.content_length}

    data = response.get_json(silent=True)
    if not isinstance(data, dict):
        return {'type': 'json', 'shape': type(data).__name__}

    summary = {'type': 'json'}
    if 'error' in data:
        summary['error'] = _truncate(data.get('error'), 300)
    if 'message' in data and response.status_code >= 400:
        summary['message'] = _truncate(data.get('message'), 300)
    if isinstance(data.get('summary'), dict):
        summary['summary'] = _safe_small_dict(data['summary'])

    for key in [
        'results', 'history', 'rows', 'customers', 'payments',
        'report_30', 'report_31', 'report_11', 'alerts',
        'retroactive_alerts', 'missing_db', 'not_generated',
    ]:
        if isinstance(data.get(key), list):
            summary[f'{key}_count'] = len(data[key])

    for key in ['log_id', 'report_date']:
        if key in data and data.get(key) not in (None, ''):
            summary[key] = data.get(key)

    return summary


def _safe_small_dict(data):
    safe = {}
    for key, value in data.items():
        if isinstance(value, (int, float, bool)) or value is None:
            safe[key] = value
        elif isinstance(value, str):
            safe[key] = _truncate(value, 120)
    return safe


def log_event(event, **fields):
    logger = logging.getLogger('lqd.events')
    record = {
        'timestamp': _utc_now_iso(),
        'event': event,
    }
    for key, value in fields.items():
        if value is not None:
            record[key] = value
    logger.info(json.dumps(record, ensure_ascii=False, default=str))
