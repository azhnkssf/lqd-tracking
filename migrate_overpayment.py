from app import create_app
from app.database import get_db

app = create_app()

with app.app_context():
    db = get_db()

    try:
        db.execute('ALTER TABLE payments ADD COLUMN overpayment FLOAT DEFAULT 0.0')
        print('Added: overpayment')
    except Exception:
        print('overpayment exists')

    try:
        db.execute('ALTER TABLE payments ADD COLUMN refunded INTEGER DEFAULT 0')
        print('Added: refunded')
    except Exception:
        print('refunded exists')

    db.commit()
    print('Migration complete')