# SmartTimetable

A private, local timetable planner for schools and colleges. It runs entirely in the browser: no API, database, account server, or data upload is required.

## What it does

- Creates a weekly timetable from subjects, teachers, rooms, and periods.
- Prevents a teacher or room from being placed in two classes at the same time.
- Saves the current timetable in the browser on the laptop.
- Shows calendar, faculty workload, room workload, and schedule insights.
- Downloads the generated timetable as a CSV file.

## Run it on a laptop

1. Install the current **Node.js LTS** release from [nodejs.org](https://nodejs.org/). Close and reopen PowerShell after installation.
2. Open PowerShell in this `smart-timetable-saas` folder.
3. Run `corepack enable` once, then run `pnpm install`.
4. Start the app with `pnpm dev:web`.
5. Open the local address printed in PowerShell (normally `http://localhost:5173`).

For a production check, run `pnpm build:web`. The generated static site is placed in `apps/web/dist`.

> Local data is stored in your browser. Clearing browser site data or using a different browser profile removes the saved timetable, so download a CSV backup when needed.
