import {
  Bot,
  BookOpen,
  Brain,
  ChartNoAxesCombined,
  ClipboardCheck,
  LayoutDashboard,
  LogOut,
  RotateCcw,
  X,
} from 'lucide-react'
import { NavLink, useNavigate } from 'react-router-dom'

const navigation = [
  { label: 'Dashboard', to: '/dashboard', icon: LayoutDashboard },
  { label: 'Subjects', to: '/subjects', icon: BookOpen },
  { label: 'My Learning', to: '/chapters', icon: Brain },
  { label: 'Flashcards', to: '/flashcards', icon: RotateCcw },
  { label: 'Quizzes', to: '/quiz', icon: ClipboardCheck },
  { label: 'AI Tutor', to: '/chatbot', icon: Bot },
  { label: 'Progress', to: '/progress', icon: ChartNoAxesCombined },
]

function Sidebar({ open, onClose }) {
  const navigate = useNavigate()

  function handleLogout() {
    onClose()
    navigate('/login')
  }

  return (
    <>
      {open && <button type="button" aria-label="Close navigation" onClick={onClose} className="fixed inset-0 z-40 bg-slate-900/30 lg:hidden" />}
      <aside className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-slate-200 bg-white px-4 py-5 transition-transform duration-200 lg:static lg:z-auto lg:translate-x-0 ${open ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="mb-7 flex items-center justify-between px-2 lg:hidden">
          <span className="text-sm font-semibold text-slate-500">Menu</span>
          <button type="button" onClick={onClose} aria-label="Close navigation" className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"><X size={19} /></button>
        </div>
        <nav className="flex-1 space-y-1" aria-label="Student navigation">
          {navigation.map(({ label, to, icon: Icon }) => (
            <NavLink key={to} to={to} onClick={onClose} className={({ isActive }) => `flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold transition ${isActive ? 'bg-emerald-50 text-emerald-700' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}>
              <Icon size={19} />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>
        <button type="button" onClick={handleLogout} className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-slate-600 transition hover:bg-red-50 hover:text-red-600">
          <LogOut size={19} />
          <span>Logout</span>
        </button>
      </aside>
    </>
  )
}

export default Sidebar
