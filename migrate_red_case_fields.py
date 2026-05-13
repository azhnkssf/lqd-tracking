from app import create_app
from app.database import get_db


app = create_app()

with app.app_context():
    db = get_db()
    columns = [
        "ALTER TABLE customers ADD COLUMN red_case_no TEXT",
        "ALTER TABLE customers ADD COLUMN judgment_note TEXT",
    ]
    for statement in columns:
        try:
            db.execute(statement)
            print(f"Applied: {statement}")
        except Exception as exc:
            print(f"Skipped: {statement} ({exc})")
    db.commit()
