from app import create_app
from app.database import get_db

app = create_app()

with app.app_context():
    db = get_db()
    try:
        db.execute('ALTER TABLE report_logs ADD COLUMN count_33 INTEGER DEFAULT 0')
        print('Added: count_33')
    except Exception:
        print('count_33 exists')
    db.commit()
    print('Migration complete')