import os

class Config:
    APP_ENV = os.environ.get('APP_ENV', 'development')
    SECRET_KEY = os.environ.get('SECRET_KEY', 'dev-secret-key-change-in-production')
    DATABASE = os.path.join(os.path.dirname(__file__), 'instance', 'lqd.db')
    SQLITE_TIMEOUT_SECONDS = float(os.environ.get('SQLITE_TIMEOUT_SECONDS', '30'))
    SQLITE_BUSY_TIMEOUT_MS = int(os.environ.get('SQLITE_BUSY_TIMEOUT_MS', '30000'))
    SQLITE_JOURNAL_MODE = os.environ.get('SQLITE_JOURNAL_MODE', 'WAL')
    SQLITE_SYNCHRONOUS = os.environ.get('SQLITE_SYNCHRONOUS', 'NORMAL')
    LOG_DIR = os.environ.get('LOG_DIR', os.path.join(os.path.dirname(__file__), 'logs'))
    LOG_LEVEL = os.environ.get('LOG_LEVEL', 'INFO')
    LOG_MAX_BYTES = int(os.environ.get('LOG_MAX_BYTES', str(5 * 1024 * 1024)))
    LOG_BACKUP_COUNT = int(os.environ.get('LOG_BACKUP_COUNT', '10'))
    ACCESS_LOG_ENABLED = os.environ.get('ACCESS_LOG_ENABLED', '1') != '0'
    EVENT_LOG_ENABLED = os.environ.get('EVENT_LOG_ENABLED', '1') != '0'
    RESPONSE_SUMMARY_LOG_ENABLED = os.environ.get('RESPONSE_SUMMARY_LOG_ENABLED', '1') != '0'
    RESPONSE_SUMMARY_MAX_BYTES = int(os.environ.get('RESPONSE_SUMMARY_MAX_BYTES', str(512 * 1024)))
    AUTH_COOKIE_NAME = os.environ.get('AUTH_COOKIE_NAME', 'token')
    AUTH_COOKIE_HTTPONLY = os.environ.get('AUTH_COOKIE_HTTPONLY', '1') != '0'
    AUTH_COOKIE_SAMESITE = os.environ.get('AUTH_COOKIE_SAMESITE', 'Strict')
    # Production deployments should set APP_ENV=production, a strong SECRET_KEY,
    # and AUTH_COOKIE_SECURE=1 so auth cookies are sent only over HTTPS.
    AUTH_COOKIE_SECURE = os.environ.get('AUTH_COOKIE_SECURE', '0') == '1'
    TOKEN_EXPIRE_HOURS = 8
    PASSWORD_MIN_LENGTH = int(os.environ.get('PASSWORD_MIN_LENGTH', '12'))
    PASSWORD_MAX_AGE_DAYS_USER = int(os.environ.get('PASSWORD_MAX_AGE_DAYS_USER', '75'))
    PASSWORD_MAX_AGE_DAYS_ADMIN = int(os.environ.get('PASSWORD_MAX_AGE_DAYS_ADMIN', '30'))
    PASSWORD_MAX_AGE_DAYS_SUPERADMIN = int(os.environ.get('PASSWORD_MAX_AGE_DAYS_SUPERADMIN', '30'))
    PASSWORD_EXPIRY_WARNING_DAYS = [7, 5, 3, 2, 1]
    LOCKOUT_FAILED_ATTEMPTS = int(os.environ.get('LOCKOUT_FAILED_ATTEMPTS', '6'))
    LOCKOUT_WINDOW_MINUTES = int(os.environ.get('LOCKOUT_WINDOW_MINUTES', '30'))
    LOCKOUT_DURATION_MINUTES = int(os.environ.get('LOCKOUT_DURATION_MINUTES', '30'))
    TEMP_PASSWORD_LENGTH = int(os.environ.get('TEMP_PASSWORD_LENGTH', '12'))
    CUSTOMER_LIST_CACHE_SCHEDULER_ENABLED = os.environ.get('CUSTOMER_LIST_CACHE_SCHEDULER_ENABLED', '1') != '0'
    CUSTOMER_LIST_CACHE_REFRESH_HOUR = int(os.environ.get('CUSTOMER_LIST_CACHE_REFRESH_HOUR', '6'))
    CUSTOMER_LIST_CACHE_REFRESH_MINUTE = int(os.environ.get('CUSTOMER_LIST_CACHE_REFRESH_MINUTE', '0'))
    CUSTOMER_LIST_CACHE_SCHEDULER_INTERVAL_SECONDS = int(os.environ.get('CUSTOMER_LIST_CACHE_SCHEDULER_INTERVAL_SECONDS', '60'))
