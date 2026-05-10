from app import create_app
from app.database import get_db


app = create_app()

with app.app_context():
    db = get_db()

    try:
        db.execute('ALTER TABLE customers ADD COLUMN judgment_difference REAL DEFAULT 0')
        print('Added: judgment_difference')
    except Exception:
        print('judgment_difference exists')

    before = db.execute('''
        SELECT COUNT(*) AS total
        FROM customers
        WHERE is_deleted = 0
          AND ROUND(COALESCE(judgment_difference, 0), 2) != ROUND(
              COALESCE(court_fee, 0) +
              COALESCE(lawyer_fee, 0) +
              COALESCE(total_debt, 0) -
              COALESCE(principal, 0),
              2
          )
    ''').fetchone()['total']

    db.execute('''
        UPDATE customers
        SET judgment_difference = ROUND(
                COALESCE(court_fee, 0) +
                COALESCE(lawyer_fee, 0) +
                COALESCE(total_debt, 0) -
                COALESCE(principal, 0),
                2
            )
        WHERE is_deleted = 0
    ''')

    db.commit()
    print(f'Migration complete: updated {before} customer rows')
