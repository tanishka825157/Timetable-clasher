import { motion } from 'framer-motion'
import { AlertTriangle, ArrowRight, CalendarCheck2, CalendarClock, DoorOpen, GraduationCap, Sparkles } from 'lucide-react'
import { Link } from 'react-router'

type StoredPlan = { sessions?: { teacher: string }[]; rooms?: string[] }

export function DashboardPage() {
  const plan = (() => { try { return JSON.parse(localStorage.getItem('smart-timetable-draft') || 'null') as StoredPlan | null } catch { return null } })()
  const sessions = plan?.sessions || []
  const teacherCount = new Set(sessions.map((session) => session.teacher).filter((teacher) => teacher !== 'Teacher to assign')).size
  const metrics = [
    { label: 'Weekly classes', value: String(sessions.length), detail: sessions.length ? 'Saved on this device' : 'Create your first draft', icon: CalendarClock, color: 'text-brand bg-brand/10' },
    { label: 'Rooms in use', value: String(plan?.rooms?.length || 0), detail: sessions.length ? 'From your timetable' : 'Add rooms in setup', icon: DoorOpen, color: 'text-cyan-600 bg-cyan-500/10' },
    { label: 'Teachers assigned', value: String(teacherCount), detail: sessions.length ? 'Across all subjects' : 'Add teachers in setup', icon: GraduationCap, color: 'text-emerald-600 bg-emerald-500/10' },
    { label: 'Open conflicts', value: '0', detail: sessions.length ? 'Protected locally' : 'Generated drafts are checked', icon: AlertTriangle, color: 'text-violet-600 bg-violet-500/10' },
  ]
  const today = new Intl.DateTimeFormat('en-US', { weekday: 'long', month: 'long', day: 'numeric' }).format(new Date()).toUpperCase()
  return <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
    <section className="relative overflow-hidden rounded-[1.65rem] border border-white/70 bg-surface px-6 py-8 shadow-[0_18px_55px_rgb(34_48_78_/_0.08)] sm:px-9 sm:py-10"><div className="absolute -right-20 -top-20 size-80 rounded-full bg-brand/13 blur-3xl" /><div className="absolute bottom-0 right-1/4 size-32 rounded-full bg-cyan-300/20 blur-3xl" /><div className="relative max-w-2xl"><p className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-brand">{today}</p><h1 className="mt-3 text-3xl font-extrabold tracking-[-0.035em] sm:text-[2.65rem] sm:leading-[1.1]">A clearer week starts here.</h1><p className="mt-4 max-w-xl text-sm leading-6 text-ink-muted sm:text-base">Plan classes, teachers, and rooms in one focused workspace. Everything stays private on this device.</p><Link to="/timetable" className="button-primary mt-7"><Sparkles size={18} /> {sessions.length ? 'Edit weekly timetable' : 'Build weekly timetable'}</Link></div></section>
    <section className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{metrics.map((metric, index) => { const Icon = metric.icon; return <motion.article key={metric.label} className="app-card group p-5 transition duration-200 hover:-translate-y-1 hover:shadow-[0_18px_38px_rgb(34_48_78_/_0.09)]" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 + index * 0.05 }}><div className="flex items-start justify-between"><span className={`grid size-11 place-items-center rounded-xl ${metric.color}`}><Icon size={20} /></span><ArrowRight size={18} className="text-ink-muted transition group-hover:translate-x-1 group-hover:text-brand" /></div><p className="mt-6 text-3xl font-extrabold tracking-tight">{metric.value}</p><p className="mt-1 text-sm font-bold">{metric.label}</p><p className="mt-1 text-xs leading-5 text-ink-muted">{metric.detail}</p></motion.article> })}</section>
    <section className="app-card mt-6 grid gap-5 p-6 sm:grid-cols-[1fr_auto] sm:items-center"><div className="flex gap-4"><span className="grid size-11 shrink-0 place-items-center rounded-xl bg-brand/10 text-brand"><CalendarCheck2 size={22} /></span><div><h2 className="text-lg font-extrabold tracking-tight">A simple path to your first timetable</h2><p className="mt-1 max-w-xl text-sm leading-6 text-ink-muted">Add subjects, eligible teachers, and rooms. The local planner produces a reviewable weekly schedule without uploading any data.</p></div></div><Link to="/timetable" className="button-secondary text-brand">{sessions.length ? 'Edit timetable' : 'Start setup'} <ArrowRight size={17} /></Link></section>
  </motion.div>
}
