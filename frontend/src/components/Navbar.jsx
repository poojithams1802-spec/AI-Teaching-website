import { Bell, GraduationCap, Menu, UserRound } from 'lucide-react'

function Navbar({ onMenuClick }) {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200 bg-white/95 px-4 backdrop-blur sm:px-6">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onMenuClick}
          aria-label="Open navigation"
          className="rounded-lg p-2 text-slate-600 transition hover:bg-slate-100 hover:text-emerald-700 lg:hidden"
        >
          <Menu size={22} />
        </button>
        <div className="flex items-center gap-2 font-bold text-slate-900">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-emerald-100 text-emerald-700">
            <GraduationCap size={21} />
          </span>
          <span className="text-lg">NCERT <span className="text-emerald-600">Buddy</span></span>
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        <button type="button" aria-label="Notifications" className="relative rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-emerald-700">
          <Bell size={20} />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-amber-400 ring-2 ring-white" />
        </button>
        <div className="flex items-center gap-2 border-l border-slate-200 pl-3 sm:gap-3 sm:pl-4">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-emerald-100 text-emerald-700"><UserRound size={18} /></span>
          <span className="hidden text-sm font-semibold text-slate-700 sm:inline">Student</span>
        </div>
      </div>
    </header>
  )
}

export default Navbar
