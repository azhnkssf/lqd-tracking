import sys
import os
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from app import create_app
from app.database import get_db
from app.services.status_service import refresh_customer_status


def run():
    db = get_db()

    rows = db.execute(
        'SELECT account_no, status FROM customers WHERE is_deleted = 0'
    ).fetchall()

    total   = len(rows)
    changed = 0
    failed  = 0

    print(f'[Migration] เริ่มอัพเดท status จำนวน {total} ราย...\n')

    for row in rows:
        account_no = row['account_no']
        old_status = row['status']
        try:
            new_status = refresh_customer_status(account_no, db)
            if new_status != old_status:
                print(f'  [{account_no}] {old_status} → {new_status}')
                changed += 1
        except Exception as e:
            print(f'  [{account_no}] ERROR: {e}')
            failed += 1

    print(f'\n[Migration] เสร็จสิ้น — เปลี่ยนแปลง: {changed}, ผิดพลาด: {failed}, ทั้งหมด: {total}')


if __name__ == '__main__':
    app = create_app()
    with app.app_context():
        run()
