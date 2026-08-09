# SmartTimetable

A private, local timetable planner for schools and colleges. It runs entirely in the browser: no API, database, account server, or data upload is required.

## What it does

- Creates a weekly timetable from subjects, teachers, rooms, and periods.
- Prevents a teacher or room from being placed in two classes at the same time.
- Saves the current timetable in the browser on the laptop.
- Shows calendar, faculty workload, room workload, and schedule insights.
- Downloads the generated timetable as a CSV file.

## Run it on a laptop

You only need [Node.js LTS](https://nodejs.org/) and Git. After installing Node.js, close and reopen PowerShell.

If you have not downloaded the project yet, run:

```powershell
git clone https://github.com/tanishka825157/Timetable-clasher.git
cd Timetable-clasher\smart-timetable-saas
```

Then install the required packages and start the website:

```powershell
corepack enable
pnpm install
pnpm dev:web
```

Open the address shown in the terminal, usually `http://localhost:5173`.

No database, API key, or `.env` file is needed to run the website. Press `Ctrl + C` in the terminal to stop it.

For a production check, run `pnpm build:web`. The generated static site is placed in `apps/web/dist`.

> Local data is stored in your browser. Clearing browser site data or using a different browser profile removes the saved timetable, so download a CSV backup when needed.
