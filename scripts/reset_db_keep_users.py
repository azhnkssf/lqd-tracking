#!/usr/bin/env python3
"""
Reset customer test data while keeping login users and active sessions.

This script deletes rows only from customer/business-data tables, then resets
AUTOINCREMENT counters for the deleted tables. Auth/security tables such as
`users`, `auth_events`, and `sessions` are left untouched. It keeps the
database schema.

Usage:
  python3 scripts/reset_db_keep_users.py --yes
  python3 scripts/reset_db_keep_users.py --db instance/lqd.db --yes
  python3 scripts/reset_db_keep_users.py --dry-run
"""

from __future__ import annotations

import argparse
import sqlite3
import sys
from pathlib import Path

ROOT_DIR = Path(__file__).resolve().parents[1]
DEFAULT_DB_PATH = ROOT_DIR / "instance" / "lqd.db"
DELETE_TABLES = {
    "case_status_logs",
    "customer_edits",
    "customers",
    "import_logs",
    "payment_deletions",
    "payments",
    "report_logs",
    "report_retroactive_fix_marks",
}
INTERNAL_TABLES = {"sqlite_sequence"}


def quote_ident(name: str) -> str:
    return '"' + name.replace('"', '""') + '"'


def get_tables(conn: sqlite3.Connection) -> list[str]:
    rows = conn.execute(
        """
        SELECT name
        FROM sqlite_master
        WHERE type = 'table'
          AND name NOT LIKE 'sqlite_%'
        ORDER BY name
        """
    ).fetchall()
    return [row[0] for row in rows]


def count_rows(conn: sqlite3.Connection, table: str) -> int:
    return int(conn.execute(f"SELECT COUNT(*) FROM {quote_ident(table)}").fetchone()[0])


def reset_database(db_path: Path, dry_run: bool) -> int:
    if not db_path.exists():
        print(f"DB not found: {db_path}", file=sys.stderr)
        return 1

    conn = sqlite3.connect(str(db_path))
    try:
        tables = get_tables(conn)
        delete_tables = [table for table in tables if table in DELETE_TABLES]
        keep_tables = [table for table in tables if table not in DELETE_TABLES]
        if not tables:
            print("No tables found.")
            return 0

        print(f"DB: {db_path}")
        print(f"Deleting customer tables: {', '.join(delete_tables) if delete_tables else '(none)'}")
        print(f"Keeping tables: {', '.join(keep_tables) if keep_tables else '(none)'}")
        print("Rows before reset:")
        for table in tables:
            print(f"  {table}: {count_rows(conn, table)}")

        if dry_run:
            print("\nDry run only. No rows were deleted.")
            return 0

        conn.execute("PRAGMA foreign_keys = OFF")
        conn.execute("BEGIN")
        try:
            for table in delete_tables:
                conn.execute(f"DELETE FROM {quote_ident(table)}")

            if "sqlite_sequence" in INTERNAL_TABLES:
                existing_internal = {
                    row[0]
                    for row in conn.execute(
                        "SELECT name FROM sqlite_master WHERE type = 'table' AND name = 'sqlite_sequence'"
                    ).fetchall()
                }
                if "sqlite_sequence" in existing_internal and delete_tables:
                    placeholders = ", ".join("?" for _ in delete_tables)
                    conn.execute(
                        f"DELETE FROM sqlite_sequence WHERE name IN ({placeholders})",
                        delete_tables,
                    )

            conn.commit()
        except Exception:
            conn.rollback()
            raise
        finally:
            conn.execute("PRAGMA foreign_keys = ON")

        print("\nRows after reset:")
        for table in tables:
            print(f"  {table}: {count_rows(conn, table)}")
        print("\nDone. Customer data was reset; auth/security tables were kept.")
        return 0
    finally:
        conn.close()


def main() -> int:
    parser = argparse.ArgumentParser(
        description="Delete customer data while keeping users, auth events, and sessions."
    )
    parser.add_argument("--db", default=str(DEFAULT_DB_PATH), help="Path to SQLite DB file.")
    parser.add_argument("--yes", action="store_true", help="Required to actually delete rows.")
    parser.add_argument("--dry-run", action="store_true", help="Show what would be deleted without deleting.")
    args = parser.parse_args()

    db_path = Path(args.db).expanduser()
    if not db_path.is_absolute():
        db_path = ROOT_DIR / db_path
    db_path = db_path.resolve()

    if not args.dry_run and not args.yes:
        print("Refusing to delete data without --yes. Use --dry-run to preview.", file=sys.stderr)
        return 2

    return reset_database(db_path, dry_run=args.dry_run)


if __name__ == "__main__":
    raise SystemExit(main())
