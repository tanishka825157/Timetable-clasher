import { Link } from 'react-router'

export function NotFoundPage() {
  return (
    <main className="grid min-h-screen place-items-center bg-canvas p-6 text-center text-ink">
      <div>
        <p className="text-sm font-bold tracking-[0.2em] text-brand">404</p>
        <h1 className="mt-3 text-3xl font-extrabold">This timetable page does not exist.</h1>
        <Link className="mt-6 inline-flex rounded-xl bg-brand px-4 py-3 text-sm font-bold text-white" to="/">Back to overview</Link>
      </div>
    </main>
  )
}
