import sqlite3
from flask import g, current_app
from app.services.judgment_service import calculate_judgment_difference


def get_db():
    if 'db' not in g:
        g.db = sqlite3.connect(
            current_app.config['DATABASE'],
            detect_types=sqlite3.PARSE_DECLTYPES,
            timeout=current_app.config.get('SQLITE_TIMEOUT_SECONDS', 30),
        )
        g.db.row_factory = sqlite3.Row
        g.db.execute('PRAGMA foreign_keys = ON')
        g.db.execute(f"PRAGMA busy_timeout = {int(current_app.config.get('SQLITE_BUSY_TIMEOUT_MS', 30000))}")
        g.db.execute(f"PRAGMA journal_mode = {current_app.config.get('SQLITE_JOURNAL_MODE', 'WAL')}")
        g.db.execute(f"PRAGMA synchronous = {current_app.config.get('SQLITE_SYNCHRONOUS', 'NORMAL')}")
    return g.db


def close_db(e=None):
    db = g.pop('db', None)
    if db is not None:
        db.close()


def init_db(app):
    with app.app_context():
        db = get_db()
        db.executescript('''
            CREATE TABLE IF NOT EXISTS payment_deletions (
                id              INTEGER PRIMARY KEY AUTOINCREMENT,
                payment_id      INTEGER NOT NULL,
                account_no      TEXT NOT NULL,
                payment_date    TEXT NOT NULL,
                amount          REAL NOT NULL,
                deleted_by      INTEGER NOT NULL REFERENCES users(id),
                deleted_at      DATETIME DEFAULT CURRENT_TIMESTAMP,
                reason          TEXT
            );
        ''')

        db.executescript('''
            CREATE TABLE IF NOT EXISTS report_logs (
                id              INTEGER PRIMARY KEY AUTOINCREMENT,
                generated_by    INTEGER NOT NULL REFERENCES users(id),
                report_date     TEXT NOT NULL,
                filename        TEXT,
                status_types    TEXT DEFAULT '30,31',
                count_30        INTEGER DEFAULT 0,
                count_31        INTEGER DEFAULT 0,
                count_skipped   INTEGER DEFAULT 0,
                count_db_total  INTEGER DEFAULT 0,
                count_generated_total INTEGER DEFAULT 0,
                count_alerts    INTEGER DEFAULT 0,
                count_missing   INTEGER DEFAULT 0,
                generated_at    DATETIME DEFAULT CURRENT_TIMESTAMP
            );
        ''')

        db.executescript('''
            CREATE TABLE IF NOT EXISTS import_logs (
                id              INTEGER PRIMARY KEY AUTOINCREMENT,
                imported_by     INTEGER NOT NULL REFERENCES users(id),
                import_type     TEXT NOT NULL,
                filename        TEXT,
                total_rows      INTEGER DEFAULT 0,
                success_rows    INTEGER DEFAULT 0,
                skip_rows       INTEGER DEFAULT 0,
                error_rows      INTEGER DEFAULT 0,
                imported_at     DATETIME DEFAULT CURRENT_TIMESTAMP,
                results_json    TEXT
            );
        ''')

        db.executescript('''
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
            );
        ''')

        db.executescript('''
            CREATE TABLE IF NOT EXISTS customer_edits (
                id              INTEGER PRIMARY KEY AUTOINCREMENT,
                customer_id     INTEGER NOT NULL REFERENCES customers(id),
                account_no      TEXT NOT NULL,
                edited_by       INTEGER NOT NULL REFERENCES users(id),
                edited_at       DATETIME DEFAULT CURRENT_TIMESTAMP,
                changes         TEXT NOT NULL
            );
        ''')

        db.executescript('''
            CREATE TABLE IF NOT EXISTS users (
                id            INTEGER PRIMARY KEY AUTOINCREMENT,
                username      TEXT UNIQUE NOT NULL,
                password_hash TEXT NOT NULL,
                display_name  TEXT,
                role          TEXT NOT NULL DEFAULT 'user',
                created_at    DATETIME DEFAULT CURRENT_TIMESTAMP
            );

            CREATE TABLE IF NOT EXISTS password_history (
                id            INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id       INTEGER NOT NULL REFERENCES users(id),
                password_hash TEXT NOT NULL,
                created_at    DATETIME DEFAULT CURRENT_TIMESTAMP
            );

            CREATE TABLE IF NOT EXISTS auth_events (
                id            INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id       INTEGER REFERENCES users(id),
                username      TEXT,
                event_type    TEXT NOT NULL,
                remote_addr   TEXT,
                details       TEXT,
                created_at    DATETIME DEFAULT CURRENT_TIMESTAMP
            );

            CREATE TABLE IF NOT EXISTS password_policy_settings (
                key           TEXT PRIMARY KEY,
                value         TEXT NOT NULL,
                updated_by    INTEGER REFERENCES users(id),
                updated_at    DATETIME DEFAULT CURRENT_TIMESTAMP
            );

            CREATE TABLE IF NOT EXISTS sessions (
                token      TEXT PRIMARY KEY,
                user_id    INTEGER NOT NULL REFERENCES users(id),
                expires_at DATETIME NOT NULL
            );

            CREATE TABLE IF NOT EXISTS customers (
                id                      INTEGER PRIMARY KEY AUTOINCREMENT,

                -- ข้อมูลพื้นฐาน
                account_no              TEXT UNIQUE NOT NULL,
                name                    TEXT NOT NULL,
                status                  TEXT DEFAULT 'ชำระปกติ',

                -- สถานะคดี
                case_status             TEXT DEFAULT 'ยื่นฟ้อง',

                -- รายละเอียดคำพิพากษา
                filing_date             TEXT,
                black_case_no           TEXT,
                red_case_no             TEXT,
                filing_capital          REAL DEFAULT 0,
                default_date            TEXT,
                pre_filing_dpd_days     INTEGER DEFAULT 0,
                filing_note             TEXT,
                judgment_date           TEXT,
                judgment_note           TEXT,
                total_debt              REAL DEFAULT 0,
                principal               REAL DEFAULT 0,
                judgment_difference     REAL DEFAULT 0,
                interest_rate           REAL DEFAULT 0,
                court_fee               REAL DEFAULT 0,
                lawyer_fee              REAL DEFAULT 0,
                installment_count       INTEGER DEFAULT 0,
                default_interest_rate   REAL DEFAULT 0,

                -- รายละเอียดการชำระเงิน
                first_due_date          TEXT,
                last_due_date           TEXT,
                installment_1           REAL DEFAULT 0,
                installment_2           REAL DEFAULT 0,
                installment_3           REAL DEFAULT 0,
                installment_4           REAL DEFAULT 0,

                -- ข้อมูลหมายบังคับคดี
                enforcement_order_no      TEXT,
                enforcement_judgment_date TEXT,
                enforcement_received_date TEXT,
                enforcement_recorded_by   INTEGER REFERENCES users(id),
                enforcement_recorded_at   DATETIME,

                -- Soft delete
                is_deleted              INTEGER NOT NULL DEFAULT 0,
                deleted_at              DATETIME,

                -- Metadata
                created_by              INTEGER REFERENCES users(id),
                created_at              DATETIME DEFAULT CURRENT_TIMESTAMP,
                updated_at              DATETIME DEFAULT CURRENT_TIMESTAMP
            );
        ''')

        db.executescript('''
            CREATE TABLE IF NOT EXISTS case_status_logs (
                id          INTEGER PRIMARY KEY AUTOINCREMENT,
                account_no  TEXT NOT NULL,
                from_status TEXT,
                to_status   TEXT NOT NULL,
                changed_by  INTEGER REFERENCES users(id),
                changed_at  DATETIME DEFAULT CURRENT_TIMESTAMP,
                note        TEXT
            );
        ''')

        new_columns = [
            'ALTER TABLE customers ADD COLUMN filing_date TEXT',
            'ALTER TABLE customers ADD COLUMN black_case_no TEXT',            'ALTER TABLE customers ADD COLUMN red_case_no TEXT',
            'ALTER TABLE customers ADD COLUMN filing_capital REAL DEFAULT 0',
            'ALTER TABLE customers ADD COLUMN default_date TEXT',
            'ALTER TABLE customers ADD COLUMN pre_filing_dpd_days INTEGER DEFAULT 0',
            'ALTER TABLE customers ADD COLUMN filing_note TEXT',
            'ALTER TABLE customers ADD COLUMN judgment_note TEXT',
            'ALTER TABLE customers ADD COLUMN principal REAL DEFAULT 0',
            'ALTER TABLE customers ADD COLUMN judgment_difference REAL DEFAULT 0',
            'ALTER TABLE customers ADD COLUMN interest_rate REAL DEFAULT 0',
            'ALTER TABLE customers ADD COLUMN court_fee REAL DEFAULT 0',
            'ALTER TABLE customers ADD COLUMN lawyer_fee REAL DEFAULT 0',
            'ALTER TABLE customers ADD COLUMN installment_count INTEGER DEFAULT 0',
            'ALTER TABLE customers ADD COLUMN default_interest_rate REAL DEFAULT 0',
            'ALTER TABLE customers ADD COLUMN first_due_date TEXT',
            'ALTER TABLE customers ADD COLUMN last_due_date TEXT',
            'ALTER TABLE customers ADD COLUMN installment_1 REAL DEFAULT 0',
            'ALTER TABLE customers ADD COLUMN installment_2 REAL DEFAULT 0',
            'ALTER TABLE customers ADD COLUMN installment_3 REAL DEFAULT 0',
            'ALTER TABLE customers ADD COLUMN installment_4 REAL DEFAULT 0',
            'ALTER TABLE customers ADD COLUMN is_deleted INTEGER NOT NULL DEFAULT 0',
            'ALTER TABLE customers ADD COLUMN deleted_at DATETIME',
            'ALTER TABLE customers ADD COLUMN created_by INTEGER REFERENCES users(id)',
            'ALTER TABLE customers ADD COLUMN updated_at DATETIME DEFAULT CURRENT_TIMESTAMP',
        ]

        db.executescript('''
            CREATE TABLE IF NOT EXISTS payment_deletions (
                id              INTEGER PRIMARY KEY AUTOINCREMENT,
                payment_id      INTEGER NOT NULL,
                account_no      TEXT NOT NULL,
                payment_date    TEXT NOT NULL,
                amount          REAL NOT NULL,
                deleted_by      INTEGER NOT NULL REFERENCES users(id),
                deleted_at      DATETIME DEFAULT CURRENT_TIMESTAMP,
                reason          TEXT
            );
        ''')

        db.executescript('''
            CREATE TABLE IF NOT EXISTS payments (
                id              INTEGER PRIMARY KEY AUTOINCREMENT,
                customer_id     INTEGER NOT NULL REFERENCES customers(id),
                account_no      TEXT NOT NULL,
                payment_date    TEXT NOT NULL,
                amount          REAL NOT NULL DEFAULT 0,
                interest_paid   REAL DEFAULT 0,
                principal_paid  REAL DEFAULT 0,
                other_paid      REAL DEFAULT 0,
                principal_bal   REAL DEFAULT 0,
                dpd_days        INTEGER DEFAULT 0,
                dpd_months      INTEGER DEFAULT 0,
                ncb_status      TEXT DEFAULT '31',
                note            TEXT,
                recorded_by     INTEGER REFERENCES users(id),
                created_at      DATETIME DEFAULT CURRENT_TIMESTAMP
            );
        ''')

        # เพิ่ม customer_edits migration
        try:
            db.execute('ALTER TABLE customers ADD COLUMN updated_at DATETIME DEFAULT CURRENT_TIMESTAMP')
        except Exception:
            pass

        try:
            db.execute("ALTER TABLE report_logs ADD COLUMN status_types TEXT DEFAULT '30,31'")
        except Exception:
            pass

        try:
            db.execute("ALTER TABLE report_logs ADD COLUMN count_33 INTEGER DEFAULT 0")
        except Exception:
            pass

        report_log_columns = [
            "ALTER TABLE report_logs ADD COLUMN count_skipped INTEGER DEFAULT 0",
            "ALTER TABLE report_logs ADD COLUMN count_db_total INTEGER DEFAULT 0",
            "ALTER TABLE report_logs ADD COLUMN count_generated_total INTEGER DEFAULT 0",
        ]
        for col in report_log_columns:
            try:
                db.execute(col)
            except Exception:
                pass

        try:
            db.execute("ALTER TABLE payments ADD COLUMN overpayment REAL DEFAULT 0")
        except Exception:
            pass

        try:
            db.execute("ALTER TABLE payments ADD COLUMN refunded INTEGER DEFAULT 0")
        except Exception:
            pass

        new_case_columns = [
            "ALTER TABLE customers ADD COLUMN case_status TEXT DEFAULT 'ยื่นฟ้อง'",
            "ALTER TABLE customers ADD COLUMN enforcement_order_no TEXT",
            "ALTER TABLE customers ADD COLUMN enforcement_judgment_date TEXT",
            "ALTER TABLE customers ADD COLUMN enforcement_received_date TEXT",
            "ALTER TABLE customers ADD COLUMN enforcement_recorded_by INTEGER REFERENCES users(id)",
            "ALTER TABLE customers ADD COLUMN enforcement_recorded_at DATETIME",
        ]
        for col in new_case_columns:
            try:
                db.execute(col)
            except Exception:
                pass

        for col_def in new_columns:
            try:
                db.execute(col_def)
            except Exception:
                pass

        list_cache_columns = [
            "ALTER TABLE customers ADD COLUMN ui_payment_status TEXT",
            "ALTER TABLE customers ADD COLUMN ui_remaining_debt REAL DEFAULT 0",
            "ALTER TABLE customers ADD COLUMN ui_principal_bal REAL DEFAULT 0",
            "ALTER TABLE customers ADD COLUMN ui_outstanding REAL DEFAULT 0",
            "ALTER TABLE customers ADD COLUMN ui_dpd_days INTEGER DEFAULT 0",
            "ALTER TABLE customers ADD COLUMN ui_dpd_months INTEGER DEFAULT 0",
            "ALTER TABLE customers ADD COLUMN ui_next_due_date TEXT",
            "ALTER TABLE customers ADD COLUMN ui_last_payment_date TEXT",
            "ALTER TABLE customers ADD COLUMN ui_last_payment_amount REAL DEFAULT 0",
            "ALTER TABLE customers ADD COLUMN ui_snapshot_date TEXT",
            "ALTER TABLE customers ADD COLUMN ui_snapshot_updated_at DATETIME",
        ]
        for col_def in list_cache_columns:
            try:
                db.execute(col_def)
            except Exception:
                pass

        user_security_columns = [
            "ALTER TABLE users ADD COLUMN first_name TEXT",
            "ALTER TABLE users ADD COLUMN last_name TEXT",
            "ALTER TABLE users ADD COLUMN employee_id TEXT",
            "ALTER TABLE users ADD COLUMN email TEXT",
            "ALTER TABLE users ADD COLUMN is_active INTEGER NOT NULL DEFAULT 1",
            "ALTER TABLE users ADD COLUMN must_change_password INTEGER NOT NULL DEFAULT 0",
            "ALTER TABLE users ADD COLUMN password_changed_at DATETIME",
            "ALTER TABLE users ADD COLUMN password_expires_at DATETIME",
            "ALTER TABLE users ADD COLUMN failed_login_count INTEGER NOT NULL DEFAULT 0",
            "ALTER TABLE users ADD COLUMN failed_login_window_started_at DATETIME",
            "ALTER TABLE users ADD COLUMN locked_until DATETIME",
            "ALTER TABLE users ADD COLUMN created_by INTEGER REFERENCES users(id)",
            "ALTER TABLE users ADD COLUMN updated_at DATETIME",
        ]
        for col_def in user_security_columns:
            try:
                db.execute(col_def)
            except Exception:
                pass

        try:
            user_age = int(current_app.config.get('PASSWORD_MAX_AGE_DAYS_USER', 90))
            admin_age = int(current_app.config.get('PASSWORD_MAX_AGE_DAYS_ADMIN', 90))
            superadmin_age = int(current_app.config.get('PASSWORD_MAX_AGE_DAYS_SUPERADMIN', 30))
            db.execute(f'''
                UPDATE users
                SET password_changed_at = COALESCE(password_changed_at, CURRENT_TIMESTAMP),
                    password_expires_at = CASE
                        WHEN role = 'superadmin' THEN datetime(CURRENT_TIMESTAMP, '+{superadmin_age} days')
                        WHEN role = 'admin' THEN datetime(CURRENT_TIMESTAMP, '+{admin_age} days')
                        ELSE datetime(CURRENT_TIMESTAMP, '+{user_age} days')
                    END
                WHERE password_expires_at IS NULL
                  AND COALESCE(must_change_password, 0) = 0
            ''')
        except Exception:
            pass

        try:
            rows = db.execute('''
                SELECT id, total_debt, principal, court_fee, lawyer_fee, judgment_difference
                FROM customers
                WHERE COALESCE(is_deleted, 0) = 0
            ''').fetchall()
            for row in rows:
                expected = calculate_judgment_difference(dict(row))
                current = round(float(row['judgment_difference'] or 0), 2)
                if current != expected:
                    db.execute(
                        'UPDATE customers SET judgment_difference = ? WHERE id = ?',
                        (expected, row['id']),
                    )
        except Exception:
            pass

        indexes = [
            "CREATE INDEX IF NOT EXISTS idx_customers_ui_payment_status ON customers(ui_payment_status)",
            "CREATE INDEX IF NOT EXISTS idx_customers_ui_next_due_date ON customers(ui_next_due_date)",
            "CREATE INDEX IF NOT EXISTS idx_customers_ui_remaining_debt ON customers(ui_remaining_debt)",
            "CREATE INDEX IF NOT EXISTS idx_customers_case_status ON customers(case_status)",
            "CREATE INDEX IF NOT EXISTS idx_payments_account_date ON payments(account_no, payment_date)",
            "CREATE INDEX IF NOT EXISTS idx_report_retro_marks_account ON report_retroactive_fix_marks(account_no)",
            "CREATE INDEX IF NOT EXISTS idx_report_retro_marks_month ON report_retroactive_fix_marks(affected_report_month)",
            "CREATE INDEX IF NOT EXISTS idx_users_role ON users(role)",
            "CREATE UNIQUE INDEX IF NOT EXISTS idx_users_employee_id ON users(employee_id) WHERE employee_id IS NOT NULL AND employee_id != ''",
            "CREATE UNIQUE INDEX IF NOT EXISTS idx_users_email ON users(email) WHERE email IS NOT NULL AND email != ''",
            "CREATE INDEX IF NOT EXISTS idx_auth_events_user ON auth_events(user_id)",
            "CREATE INDEX IF NOT EXISTS idx_auth_events_type ON auth_events(event_type)",
        ]
        for statement in indexes:
            try:
                db.execute(statement)
            except Exception:
                pass

        db.commit()
