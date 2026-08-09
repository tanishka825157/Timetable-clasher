# SmartTimetable

SmartTimetable is a modern timetable planner for schools and colleges. Create a weekly class schedule, assign teachers and rooms, review workloads, and download the timetable as a CSV file.

The app runs locally in the browser. It does not require a database, API key, or `.env` file.

## What you need before starting

Install these two free tools:

1. [Git](https://git-scm.com/downloads) — used to download the project.
2. [Node.js LTS](https://nodejs.org/) — choose the **LTS** version. Node.js installs `npm`; the project uses `pnpm`, which will be enabled in the steps below.

After installing Node.js, close and reopen your terminal once.

## Run the project on your laptop

Open PowerShell (Windows Terminal is also fine) and run the commands below one at a time.

### 1. Download the project

```powershell
git clone https://github.com/tanishka825157/Timetable-clasher.git
cd Timetable-clasher\smart-timetable-saas
```

### 2. Enable pnpm and install the project packages

```powershell
corepack enable
pnpm install
```

`pnpm install` downloads all required website packages automatically, including React, Tailwind CSS, icons, and animation libraries.

### 3. Start the website

```powershell
pnpm dev:web
```

When the terminal shows a local address, open it in your browser. It is usually:

```text
http://localhost:5173
```

To stop the website, return to the terminal and press `Ctrl + C`.

## Create a production build (optional)

Use this when you want to verify that the website is ready to deploy:

```powershell
pnpm build:web
```

The generated files will be in `smart-timetable-saas\apps\web\dist`.

## Notes

- Timetables are saved only in your browser on your laptop.
- Clearing browser data or changing to another browser removes saved local timetables.
- Use the **Download CSV** button in the app to keep a backup of your schedule.

## Project structure

```text
smart-timetable-saas/
  apps/web/       React website
  apps/api/       Optional API foundation (not required to run the website)
```
