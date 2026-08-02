import { Bell, ChevronDown, Command, Moon, Search, Sun } from 'lucide-react'
import { useState } from 'react'
import { useTheme } from '../../hooks/useTheme'

export function Topbar() {
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()

  return (
    <header className="sticky top-0 z-10 border-b bg-canvas/75 backdrop-blur-xl">
      <div className="mx-auto flex h-18 max-w-7xl items-center gap-3 px-4 sm:px-6 lg:px-8">
        <button className="group hidden flex-1 items-center gap-3 rounded-xl border bg-surface px-3 py-2 text-left shadow-sm transition hover:border-brand/35 sm:flex" type="button">
          <Search size={18} className="text-ink-muted" />
          <span className="flex-1 text-sm text-ink-muted">Search schedules, rooms, faculty...</span>
          <span className="inline-flex items-center gap-1 rounded-md bg-surface-muted px-1.5 py-1 text-xs font-semibold text-ink-muted">
            <Command size={12} /> K
          </span>
        </button>

        <div className="ml-auto flex items-center gap-2">
          <button className="grid size-10 place-items-center rounded-xl border bg-surface text-ink-muted transition hover:border-brand/35 hover:text-brand" type="button" onClick={toggleTheme} aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}>
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button className="relative grid size-10 place-items-center rounded-xl border bg-surface text-ink-muted transition hover:border-brand/35 hover:text-brand" type="button" aria-label="Notifications">
            <Bell size={18} />
            <span className="absolute right-2 top-2 size-1.5 rounded-full bg-brand" />
          </button>
          <div className="relative">
            <button className="flex items-center gap-2 rounded-xl p-1.5 transition hover:bg-surface-muted" type="button" onClick={() => setIsProfileOpen((isOpen) => !isOpen)} aria-expanded={isProfileOpen} aria-haspopup="menu">
              <span className="grid size-8 place-items-center rounded-lg bg-linear-to-br from-cyan-500 to-brand text-xs font-extrabold text-white">TA</span>
              <ChevronDown size={16} className="hidden text-ink-muted sm:block" />
            </button>
            {isProfileOpen && (
              <div className="absolute right-0 top-12 w-56 rounded-card border bg-surface p-2 shadow-soft" role="menu">
                <div className="px-3 py-2">
                  <p className="text-sm font-bold">Tanu</p>
                  <p className="text-xs text-ink-muted">College administrator</p>
                </div>
                <div className="my-1 border-t" />
                <button className="w-full rounded-lg px-3 py-2 text-left text-sm font-semibold text-ink-muted hover:bg-surface-muted hover:text-ink" type="button" role="menuitem">Account settings</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
