from flask import Flask
from config import Config
from app.database import close_db, init_db


def create_app():
    app = Flask(__name__, template_folder='../templates', static_folder='../static')
    app.config.from_object(Config)

    app.teardown_appcontext(close_db)

    from app.routes import auth, customers, schedule, payments, imports, reports
    app.register_blueprint(auth.bp)
    app.register_blueprint(customers.bp)
    app.register_blueprint(schedule.bp)
    app.register_blueprint(payments.bp)
    app.register_blueprint(imports.bp)
    app.register_blueprint(reports.bp)

    @app.after_request
    def add_cors_headers(response):
        response.headers['Access-Control-Allow-Origin'] = '*'
        response.headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization'
        response.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS'
        return response

    @app.route('/')
    def index():
        from flask import redirect
        return redirect('/login')

    @app.route('/login')
    def login_page():
        from flask import render_template
        return render_template('login.html')

    @app.route('/inventory')
    def inventory_page():
        from flask import redirect
        return redirect('/customer-list')

    @app.route('/data-import')
    def data_import_page():
        from flask import render_template, request, redirect
        from app.services.auth_service import get_user_by_token
        token = request.cookies.get('token')
        if not token or not get_user_by_token(token):
            return redirect('/login')
        return render_template('data-import.html')

    @app.route('/payment-record')
    def payment_record_page():
        from flask import render_template, request, redirect
        from app.services.auth_service import get_user_by_token
        token = request.cookies.get('token')
        if not token or not get_user_by_token(token):
            return redirect('/login')
        return render_template('payment-record.html')

    @app.route('/customer-detail')
    def customer_detail_page():
        from flask import render_template, request, redirect
        from app.services.auth_service import get_user_by_token
        token = request.cookies.get('token')
        if not token or not get_user_by_token(token):
            return redirect('/login')
        return render_template('customer-detail.html')

    @app.route('/customer-add')
    def customer_add_page():
        from flask import render_template, request, redirect
        from app.services.auth_service import get_user_by_token
        token = request.cookies.get('token')
        if not token or not get_user_by_token(token):
            return redirect('/login')
        return render_template('customer-add.html')

    @app.route('/customer-list')
    def customer_list_page():
        from flask import render_template, request, redirect
        from app.services.auth_service import get_user_by_token
        token = request.cookies.get('token')
        if not token or not get_user_by_token(token):
            return redirect('/login')
        return render_template('customer-list.html')

    @app.route('/report')
    def report_page():
        from flask import render_template, request, redirect
        from app.services.auth_service import get_user_by_token
        token = request.cookies.get('token')
        if not token or not get_user_by_token(token):
            return redirect('/login')
        return render_template('report.html')

    init_db(app)

    return app