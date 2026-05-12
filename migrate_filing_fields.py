from app import create_app
from app.database import get_db


def migrate():
    db = get_db()
    columns = [
        'ALTER TABLE customers ADD COLUMN default_date TEXT',
        'ALTER TABLE customers ADD COLUMN pre_filing_dpd_days INTEGER DEFAULT 0',
        'ALTER TABLE customers ADD COLUMN filing_note TEXT',
    ]
    for statement in columns:
        try:
            db.execute(statement)
        except Exception:
            pass
    db.commit()
    print('Migration complete: filing fields are ready')


if __name__ == '__main__':
    app = create_app()
    with app.app_context():
        migrate()
