# LQD Tracking

Flask application for customer litigation tracking, payments, imports, and report generation.

## Project Structure

```text
app/
  routes/       API route modules
  services/     Business logic and shared calculations
  jobs/         Scheduled/CLI jobs
  database.py   SQLite connection and schema initialization
templates/      HTML pages and shared partials
static/         Static assets, if needed
config.py       Environment-driven configuration
run.py          Local development entry point
requirements.txt
```

Runtime/local folders such as `instance/`, `logs/`, `venv/`, and `__pycache__/` are intentionally ignored by git.

## Setup

```powershell
python -m venv venv
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt
copy .env.example .env
python run.py
```

For production, set a real `SECRET_KEY`, set `APP_ENV=production`, and enable `AUTH_COOKIE_SECURE=1` when serving over HTTPS.

## Notes

- Database schema creation and idempotent column/table setup live in `app/database.py`.
- One-off migration, data-fix SQL, and generated CSV files are not kept in the repo. Recreate them only when a specific maintenance task needs them.
