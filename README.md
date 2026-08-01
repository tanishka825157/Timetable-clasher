# College Timetable & Room Clash Detector

A login-protected Django admin tool for building and auditing college schedules. It flags room clashes, faculty clashes, and capacity violations before a section is saved.

## Run locally

1. Create and activate a virtual environment (optional but recommended), then install dependencies: `python -m pip install -r requirements.txt`.
2. Copy `.env.example` to `.env` and change `SECRET_KEY` for non-development use. Set `DATABASE_URL` to switch from the default SQLite database to PostgreSQL.
3. Create the schema and an administrator: `python manage.py migrate` then `python manage.py createsuperuser`.
4. Load demonstration records: `python manage.py seed_demo_data`.
5. Start the server: `python manage.py runserver` and sign in at `http://127.0.0.1:8000/accounts/login/`.

Use **Add Section** for HTMX-powered conflict feedback, **Weekly timetable** for a filterable schedule and Excel export, and **Clash Report** to audit a semester.

## Tests

Run `python manage.py test`.
