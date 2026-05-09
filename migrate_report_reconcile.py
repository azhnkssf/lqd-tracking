from app import create_app
from app.database import get_db


app = create_app()

with app.app_context():
    db = get_db()
    columns = [
        "ALTER TABLE report_logs ADD COLUMN count_skipped INTEGER DEFAULT 0",
        "ALTER TABLE report_logs ADD COLUMN count_db_total INTEGER DEFAULT 0",
        "ALTER TABLE report_logs ADD COLUMN count_generated_total INTEGER DEFAULT 0",
    ]

    for sql in columns:
        try:
            db.execute(sql)
            print(f"OK: {sql}")
        except Exception as e:
            print(f"SKIP: {sql} ({e})")

    db.commit()
