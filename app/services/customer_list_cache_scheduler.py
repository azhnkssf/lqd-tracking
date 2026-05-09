import os
import threading
import time
from datetime import datetime

from app.database import get_db
from app.services.customer_list_cache_service import refresh_all_customer_list_cache


_scheduler_started = False
_scheduler_lock = threading.Lock()


def _should_start_scheduler(app):
    if os.environ.get('WERKZEUG_RUN_MAIN') == 'false':
        return False
    return bool(app.config.get('CUSTOMER_LIST_CACHE_SCHEDULER_ENABLED', True))


def start_customer_list_cache_scheduler(app):
    global _scheduler_started
    if not _should_start_scheduler(app):
        return

    with _scheduler_lock:
        if _scheduler_started:
            return
        _scheduler_started = True

    hour = int(app.config.get('CUSTOMER_LIST_CACHE_REFRESH_HOUR', 6))
    minute = int(app.config.get('CUSTOMER_LIST_CACHE_REFRESH_MINUTE', 0))
    interval_seconds = int(app.config.get('CUSTOMER_LIST_CACHE_SCHEDULER_INTERVAL_SECONDS', 60))

    def worker():
        last_run_date = None
        while True:
            now = datetime.now()
            if now.hour == hour and now.minute == minute and last_run_date != now.date():
                with app.app_context():
                    db = get_db()
                    try:
                        result = refresh_all_customer_list_cache(db=db)
                        app.logger.info('Customer list cache refreshed: %s', result)
                    except Exception:
                        app.logger.exception('Customer list cache refresh failed')
                last_run_date = now.date()
            time.sleep(interval_seconds)

    thread = threading.Thread(target=worker, name='customer-list-cache-scheduler', daemon=True)
    thread.start()
