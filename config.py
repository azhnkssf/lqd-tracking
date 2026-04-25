import os

class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY', 'dev-secret-key-change-in-production')
    DATABASE = os.path.join(os.path.dirname(__file__), 'instance', 'lqd.db')
    TOKEN_EXPIRE_HOURS = 8
