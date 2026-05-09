import os

class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY', 'dev-secret-key-change-in-production')
    DATABASE = os.path.join(os.path.dirname(__file__), 'instance', 'lqd.db')
    TOKEN_EXPIRE_HOURS = 8
    CUSTOMER_LIST_CACHE_SCHEDULER_ENABLED = os.environ.get('CUSTOMER_LIST_CACHE_SCHEDULER_ENABLED', '1') != '0'
    CUSTOMER_LIST_CACHE_REFRESH_HOUR = int(os.environ.get('CUSTOMER_LIST_CACHE_REFRESH_HOUR', '6'))
    CUSTOMER_LIST_CACHE_REFRESH_MINUTE = int(os.environ.get('CUSTOMER_LIST_CACHE_REFRESH_MINUTE', '0'))
    CUSTOMER_LIST_CACHE_SCHEDULER_INTERVAL_SECONDS = int(os.environ.get('CUSTOMER_LIST_CACHE_SCHEDULER_INTERVAL_SECONDS', '60'))
