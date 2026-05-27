import argparse
import sqlite3
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))

from app.services.judgment_service import calculate_judgment_difference


def recalculate(db_path, include_deleted=False, dry_run=False):
    conn = sqlite3.connect(db_path)
    conn.row_factory = sqlite3.Row
    try:
        where = '' if include_deleted else 'WHERE COALESCE(is_deleted, 0) = 0'
        rows = conn.execute(f'''
            SELECT id, account_no, total_debt, principal, court_fee, lawyer_fee, judgment_difference
            FROM customers
            {where}
        ''').fetchall()

        changed = 0
        for row in rows:
            expected = calculate_judgment_difference(dict(row))
            current = round(float(row['judgment_difference'] or 0), 2)
            if current == expected:
                continue

            changed += 1
            print(f'{row["account_no"]}: {current:.2f} -> {expected:.2f}')
            if not dry_run:
                conn.execute(
                    'UPDATE customers SET judgment_difference = ? WHERE id = ?',
                    (expected, row['id']),
                )

        if dry_run:
            conn.rollback()
        else:
            conn.commit()

        return changed
    finally:
        conn.close()


def main():
    parser = argparse.ArgumentParser(
        description='Recalculate customers.judgment_difference with the shared backend formula.'
    )
    parser.add_argument('db_path', help='Path to the SQLite database file')
    parser.add_argument('--include-deleted', action='store_true', help='Also update deleted customer rows')
    parser.add_argument('--dry-run', action='store_true', help='Print changes without updating the database')
    args = parser.parse_args()

    changed = recalculate(args.db_path, include_deleted=args.include_deleted, dry_run=args.dry_run)
    action = 'would update' if args.dry_run else 'updated'
    print(f'{action} {changed} customer row(s)')


if __name__ == '__main__':
    main()
