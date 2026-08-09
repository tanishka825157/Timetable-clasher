import type { LucideIcon } from 'lucide-react'
import {
  BarChart3,
  CalendarDays,
  CalendarRange,
  CalendarClock,
  DoorOpen,
  GraduationCap,
  LayoutDashboard,
  Settings,
} from 'lucide-react'
import { NavLink } from 'react-router'

type NavigationItem = {
  label: string
  to: string
  icon: LucideIcon
}

const navigationItems: NavigationItem[] = [
  { label: 'Overview', to: '/', icon: LayoutDashboard },
  { label: 'Timetable', to: '/timetable', icon: CalendarClock },
  { label: 'Calendar', to: '/calendar', icon: CalendarDays },
  { label: 'Rooms', to: '/rooms', icon: DoorOpen },
  { label: 'Faculty', to: '/faculty', icon: GraduationCap },
  { label: 'Analytics', to: '/analytics', icon: BarChart3 },
]

function NavigationLink({ item }: { item: NavigationItem }) {
  const Icon = item.icon

  return (
    <NavLink
      to={item.to}
      end={item.to === '/'}
      className={({ isActive }) =>
        `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition ${
          isActive
            ? 'bg-brand text-white shadow-[0_10px_24px_rgb(91_92_240_/_0.28)]'
            : 'text-ink-muted hover:bg-surface-muted hover:text-ink'
        }`
      }
    >
      <Icon size={19} strokeWidth={2.2} />
      {item.label}
    </NavLink>
  )
}

export function Sidebar() {
  return (
    <>
      <aside className="fixed inset-y-0 left-0 z-20 hidden w-72 border-r border-white/70 bg-surface/82 px-5 py-7 backdrop-blur-xl lg:flex lg:flex-col">
        <NavLink to="/" className="flex items-center gap-3 px-2" aria-label="SmartTimetable home">
          <span className="grid size-10 place-items-center rounded-xl bg-linear-to-br from-brand to-violet-400 text-white shadow-[0_10px_24px_rgb(91_92_240_/_0.3)]">
            <CalendarRange size={21} />
          </span>
          <span>
            <span className="block text-base font-extrabold tracking-tight">SmartTimetable</span>
            <span className="block text-xs font-medium text-ink-muted">Academic command center</span>
          </span>
        </NavLink>

        <p className="mt-10 px-3 text-[10px] font-extrabold uppercase tracking-[0.18em] text-ink-muted/75">Workspace</p>
        <nav className="mt-3 space-y-1" aria-label="Main navigation">
          {navigationItems.map((item) => <NavigationLink key={item.label} item={item} />)}
        </nav>

        <div className="mt-auto rounded-[1.25rem] border border-brand/10 bg-linear-to-br from-brand/10 to-cyan-400/10 p-4">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand">Planning status</p>
          <p className="mt-2 text-sm font-bold">Semester setup</p>
          <p className="mt-1 text-xs leading-5 text-ink-muted">Add departments and rooms to generate your first timetable.</p>
          <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-brand/15">
            <div className="h-full w-1/4 rounded-full bg-brand" />
          </div>
        </div>

        <NavLink to="/settings" className="mt-5 flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-ink-muted transition hover:bg-surface-muted hover:text-ink">
          <Settings size={19} strokeWidth={2.2} />
          Settings
        </NavLink>
      </aside>

      <nav className="fixed inset-x-3 bottom-3 z-30 flex justify-around rounded-2xl border bg-surface/90 p-2 shadow-soft backdrop-blur-xl lg:hidden" aria-label="Mobile navigation">
        {navigationItems.slice(0, 4).map((item) => <NavigationLink key={item.label} item={item} />)}
      </nav>
    </>
  )
}
