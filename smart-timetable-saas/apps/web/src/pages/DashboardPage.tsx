import { motion } from 'framer-motion'
import { AlertTriangle, ArrowRight, CalendarCheck2, CalendarClock, DoorOpen, GraduationCap, Sparkles } from 'lucide-react'
import { Link } from 'react-router'

const metrics = [
  { label: "Today's classes", value: '24', detail: 'Across 6 departments', icon: CalendarClock, color: 'text-brand bg-brand/10' },
  { label: 'Available rooms', value: '12', detail: 'Ready this afternoon', icon: DoorOpen, color: 'text-cyan-600 bg-cyan-500/10' },
  { label: 'Faculty availability', value: '87%', detail: 'Healthy teaching load', icon: GraduationCap, color: 'text-emerald-600 bg-emerald-500/10' },
  { label: 'Open conflicts', value: '0', detail: 'Your schedule is clear', icon: AlertTriangle, color: 'text-violet-600 bg-violet-500/10' },
]

export function DashboardPage() {
  const today = new Intl.DateTimeFormat('en-US', { weekday: 'long', month: 'long', day: 'numeric' }).format(new Date()).toUpperCase()
  return <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
    <section className="relative overflow-hidden rounded-card border bg-surface p-6 shadow-soft sm:p-8"><div className="absolute -right-20 -top-20 size-72 rounded-full bg-brand/10 blur-3xl" /><div className="relative max-w-2xl"><p className="text-sm font-bold text-brand">{today}</p><h1 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">Good afternoon, Tanu.</h1><p className="mt-3 max-w-xl text-sm leading-6 text-ink-muted sm:text-base">Add the people and subjects your school needs, then let the timetable assistant prepare a weekly draft.</p><Link to="/timetable" className="mt-6 inline-flex items-center gap-2 rounded-xl bg-brand px-4 py-3 text-sm font-bold text-white shadow-[0_12px_24px_rgb(91_92_240_/_0.25)] transition hover:bg-brand-strong"><Sparkles size={18} /> Build weekly timetable</Link></div></section>
    <section className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{metrics.map((metric, index) => { const Icon = metric.icon; return <motion.article key={metric.label} className="rounded-card border bg-surface p-5 shadow-sm" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 + index * 0.05 }}><div className="flex items-start justify-between"><span className={`grid size-10 place-items-center rounded-xl ${metric.color}`}><Icon size={20} /></span><ArrowRight size={18} className="text-ink-muted" /></div><p className="mt-5 text-2xl font-extrabold tracking-tight">{metric.value}</p><p className="mt-1 text-sm font-bold">{metric.label}</p><p className="mt-1 text-xs text-ink-muted">{metric.detail}</p></motion.article> })}</section>
    <section className="mt-6 grid gap-5 rounded-card border bg-surface p-6 sm:grid-cols-[1fr_auto] sm:items-center"><div><span className="grid size-11 place-items-center rounded-xl bg-brand/10 text-brand"><CalendarCheck2 size={22} /></span><h2 className="mt-4 text-lg font-extrabold">A simple path to your first timetable</h2><p className="mt-1 max-w-xl text-sm leading-6 text-ink-muted">First add departments and subjects. Next, choose teachers who can teach each subject. Finally, set rooms and weekly periods—our assistant turns it into a reviewable schedule.</p></div><Link to="/timetable" className="inline-flex items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-bold text-brand hover:bg-surface-muted">Start setup <ArrowRight size={17} /></Link></section>
  </motion.div>
}
