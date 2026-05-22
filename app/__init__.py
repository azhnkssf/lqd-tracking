from flask import Flask
from config import Config
from app.database import close_db, init_db
from app.logging_config import log_event, register_request_logging, setup_logging


def create_app():
    app = Flask(__name__, template_folder='../templates', static_folder='../static')
    app.config.from_object(Config)
    setup_logging(app)
    register_request_logging(app)

    if app.config['SECRET_KEY'] == 'dev-secret-key-change-in-production':
        message = 'Default SECRET_KEY is being used. Set SECRET_KEY before running on the server.'
        if app.config.get('APP_ENV') == 'production':
            raise RuntimeError(message)
        app.logger.warning(message)

    app.teardown_appcontext(close_db)

    from app.routes import auth, customers, schedule, payments, imports, reports, users
    app.register_blueprint(auth.bp)
    app.register_blueprint(customers.bp)
    app.register_blueprint(schedule.bp)
    app.register_blueprint(payments.bp)
    app.register_blueprint(imports.bp)
    app.register_blueprint(reports.bp)
    app.register_blueprint(users.bp)

    @app.after_request
    def add_cors_headers(response):
        response.headers['Access-Control-Allow-Origin'] = '*'
        response.headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization'
        response.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS'
        return response

    @app.route('/')
    def index():
        from flask import redirect
        from app.services.auth_service import users_exist
        if not users_exist():
            return redirect('/setup-superadmin')
        return redirect('/login')

    @app.route('/login')
    def login_page():
        from flask import render_template, redirect
        from app.services.auth_service import users_exist
        if not users_exist():
            return redirect('/setup-superadmin')
        return render_template('login.html')

    @app.route('/setup-superadmin')
    def setup_superadmin_page():
        from flask import render_template, redirect
        from app.services.auth_service import users_exist
        if users_exist():
            return redirect('/login')
        return render_template('setup-superadmin.html')

    def _current_session_user():
        from flask import request
        from app.services.auth_service import get_user_by_token
        token = request.cookies.get(app.config.get('AUTH_COOKIE_NAME', 'token'))
        if not token:
            return None
        return get_user_by_token(token)

    def _guard_page(allow_superadmin=False, superadmin_only=False):
        from flask import redirect
        from app.services.auth_service import get_login_redirect, users_exist
        if not users_exist():
            return None, redirect('/setup-superadmin')
        user = _current_session_user()
        if not user:
            return None, redirect('/login')
        redirect_to = get_login_redirect(user)
        if redirect_to == '/change-password':
            return user, redirect('/change-password')
        if superadmin_only and user['role'] != 'superadmin':
            return user, redirect('/customer-list')
        if not allow_superadmin and user['role'] == 'superadmin':
            return user, redirect('/users')
        return user, None

    @app.route('/change-password')
    def change_password_page():
        from flask import render_template, redirect
        user = _current_session_user()
        if not user:
            return redirect('/login')
        return render_template('change-password.html')

    @app.route('/users')
    def users_page():
        from flask import render_template
        _, redirect_response = _guard_page(allow_superadmin=True, superadmin_only=True)
        if redirect_response:
            return redirect_response
        return render_template('users.html', active_page='users')

    @app.route('/password-policy')
    def password_policy_page():
        from flask import render_template
        _, redirect_response = _guard_page(allow_superadmin=True, superadmin_only=True)
        if redirect_response:
            return redirect_response
        return render_template('password-policy.html', active_page='password-policy')

    @app.route('/inventory')
    def inventory_page():
        from flask import redirect
        return redirect('/customer-list')

    @app.route('/data-import')
    def data_import_page():
        from flask import render_template
        _, redirect_response = _guard_page()
        if redirect_response:
            return redirect_response
        return render_template('data-import.html')

    @app.route('/payment-record')
    def payment_record_page():
        from flask import render_template
        _, redirect_response = _guard_page()
        if redirect_response:
            return redirect_response
        return render_template('payment-record.html')

    @app.route('/customer-detail')
    def customer_detail_page():
        from flask import render_template
        _, redirect_response = _guard_page()
        if redirect_response:
            return redirect_response
        return render_template('customer-detail.html')

    @app.route('/customer-add')
    def customer_add_page():
        from flask import render_template
        _, redirect_response = _guard_page()
        if redirect_response:
            return redirect_response
        return render_template('customer-add.html')

    @app.route('/customer-list')
    def customer_list_page():
        from flask import render_template
        _, redirect_response = _guard_page()
        if redirect_response:
            return redirect_response
        return render_template('customer-list.html')

    @app.route('/report')
    def report_page():
        from flask import render_template
        _, redirect_response = _guard_page()
        if redirect_response:
            return redirect_response
        return render_template('report.html')

    init_db(app)
    from app.services.customer_list_cache_scheduler import start_customer_list_cache_scheduler
    start_customer_list_cache_scheduler(app)

    app.logger.info(
        'LQD Tracking app started database=%s cache_scheduler_enabled=%s',
        app.config['DATABASE'],
        app.config.get('CUSTOMER_LIST_CACHE_SCHEDULER_ENABLED', True),
    )
    log_event(
        'app_started',
        database=app.config['DATABASE'],
        cache_scheduler_enabled=app.config.get('CUSTOMER_LIST_CACHE_SCHEDULER_ENABLED', True),
    )

    return app
