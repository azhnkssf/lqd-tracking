"""
Daily Status Refresh Job
รันทุกเช้าเพื่ออัพเดท status ของลูกหนี้ทุกราย

วิธีตั้ง cron (รันทุกวันเวลา 01:00 น.):
    0 1 * * * cd /path/to/project && python -m app.jobs.daily_status_refresh
"""

from app.database import get_db
from app.services.status_service import refresh_customer_status


def run():
    db = get_db()

    rows = db.execute(
        'SELECT account_no FROM customers WHERE is_deleted = 0'
    ).fetchall()

    total   = len(rows)
    updated = 0
    failed  = 0

    for row in rows:
        try:
            refresh_customer_status(row['account_no'], db)
            updated += 1
        except Exception as e:
            print(f'[Daily Job] ERROR account {row["account_no"]}: {e}')
            failed += 1

    print(f'[Daily Job] Done — updated: {updated}, failed: {failed}, total: {total}')


if __name__ == '__main__':
    import sys
    import os
    sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..')))

    from app import create_app
    app = create_app()
    with app.app_context():
        run()
