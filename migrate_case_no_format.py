import re

from app import create_app
from app.database import get_db


def normalize_case_no(value):
    raw = str(value or '').strip()
    if not raw:
        return raw

    raw = re.sub(r'\s*/\s*', '/', raw)
    raw = re.sub(r'\s+', ' ', raw)
    match = re.fullmatch('([A-Za-z\u0E01-\u0E2E]{1,8})\\s*([A-Za-z]?\\d{1,8})/(25\\d{2})', raw)
    if not match:
        return raw

    return f'{match.group(1)}{match.group(2)}/{match.group(3)}'


def main():
    app = create_app()
    with app.app_context():
        db = get_db()
        rows = db.execute(
            'SELECT id, black_case_no, red_case_no FROM customers'
        ).fetchall()

        changed = 0
        for row in rows:
            black_case_no = normalize_case_no(row['black_case_no'])
            red_case_no = normalize_case_no(row['red_case_no'])
            if black_case_no != (row['black_case_no'] or '') or red_case_no != (row['red_case_no'] or ''):
                db.execute(
                    'UPDATE customers SET black_case_no = ?, red_case_no = ? WHERE id = ?',
                    (black_case_no or None, red_case_no or None, row['id'])
                )
                changed += 1

        db.commit()
        print(f'Normalized case number format for {changed} customer rows.')


if __name__ == '__main__':
    main()
