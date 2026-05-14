from app import create_app
from app.database import get_db
import hashlib

def hash_password(password):
    return hashlib.sha256(password.encode()).hexdigest()

app = create_app()

with app.app_context():
    db = get_db()

    users = [
        ('user01',     'password01', 'สมชาย ใจดี',  'user'),
        ('admin01',    'password01', 'Wisaruth Luangtep',   'admin'),
        ('admin02',    'password01', 'วิไล รักดี',   'admin'),
        ('superadmin', 'password01', 'ผู้ดูแลระบบ',  'superadmin'),
    ]

    for username, password, display_name, role in users:
        try:
            db.execute(
                'INSERT INTO users (username, password_hash, display_name, role) VALUES (?, ?, ?, ?)',
                (username, hash_password(password), display_name, role)
            )
            print(f'Created user: {username} ({role})')
        except Exception as e:
            print(f'Skip {username}: {e}')
    db.commit()
    print('Done.')