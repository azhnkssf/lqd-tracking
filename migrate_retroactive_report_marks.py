from app import create_app
from app.database import get_db


def migrate():
    app = create_app()
    with app.app_context():
        db = get_db()
        db.execute('''
            CREATE TABLE IF NOT EXISTS report_retroactive_fix_marks (
                id                      INTEGER PRIMARY KEY AUTOINCREMENT,
                account_no              TEXT NOT NULL,
                affected_report_month   TEXT NOT NULL,
                effective_date          TEXT NOT NULL,
                reason_code             TEXT NOT NULL,
                source_report_month     TEXT,
                marked_by               INTEGER NOT NULL REFERENCES users(id),
                marked_at               DATETIME DEFAULT CURRENT_TIMESTAMP,
                note                    TEXT,
                UNIQUE(account_no, affected_report_month, reason_code)
            )
        ''')
        db.execute(
            'CREATE INDEX IF NOT EXISTS idx_report_retro_marks_account '
            'ON report_retroactive_fix_marks(account_no)'
        )
        db.execute(
            'CREATE INDEX IF NOT EXISTS idx_report_retro_marks_month '
            'ON report_retroactive_fix_marks(affected_report_month)'
        )
        db.commit()
        print('Migration complete: report_retroactive_fix_marks')


if __name__ == '__main__':
    migrate()
