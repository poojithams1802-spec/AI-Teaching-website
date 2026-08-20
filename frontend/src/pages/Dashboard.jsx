import {
  ArrowRight,
  Award,
  BookOpen,
  Brain,
  CheckCircle2,
  ChevronRight,
  CircleHelp,
  Flame,
  GraduationCap,
  Layers3,
  MessageCircle,
  Play,
  Sparkles,
  Target,
  Trophy,
} from 'lucide-react'
import { Link } from 'react-router-dom'

const subjects = [
  { name: 'Mathematics', chapters: 15, progress: 72, color: 'indigo', icon: Brain },
  { name: 'Science', chapters: 16, progress: 65, color: 'emerald', icon: FlaskIcon },
  { name: 'Social Science', chapters: 20, progress: 54, color: 'amber', icon: GlobeIcon },
  { name: 'English', chapters: 11, progress: 81, color: 'rose', icon: BookOpen },
]

const activities = [
  { text: 'Completed "Electricity" quiz', detail: '80%', icon: Trophy, color: 'emerald' },
  { text: 'Finished "Chemical Reactions" chapter', detail: 'Today', icon: CheckCircle2, color: 'indigo' },
  { text: 'Reviewed 15 Physics flashcards', detail: 'Yesterday', icon: Layers3, color: 'amber' },
]

function Dashboard() {
  return (
    <div className="mx-auto w-full max-w-7xl space-y-6 p-4 sm:p-6 lg:p-8">
      <section className="flex flex-col justify-between gap-5 rounded-2xl bg-gradient-to-br from-emerald-700 to-teal-600 p-6 text-white shadow-lg shadow-emerald-900/10 sm:flex-row sm:items-end sm:p-8">
        <div>
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.16em] text-emerald-100">Student dashboard</p>
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Good morning, Student! <span aria-hidden="true">👋</span></h1>
          <p className="mt-2 max-w-xl text-emerald-50">Continue your learning journey and achieve your goals.</p>
        </div>
        <div className="flex items-center gap-3 rounded-xl bg-white/10 px-4 py-3 text-sm text-emerald-50 ring-1 ring-white/15"><Sparkles size={18} /> Keep your momentum going</div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.25fr_1fr]">
        <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7">
          <div className="mb-6 flex items-start justify-between gap-4"><div><p className="text-sm font-semibold text-slate-500">Your overview</p><h2 className="mt-1 text-xl font-bold text-slate-900">Overall Progress</h2></div><div className="grid h-16 w-16 place-items-center rounded-full border-[7px] border-emerald-100 border-t-emerald-600 text-lg font-bold text-emerald-700">68%</div></div>
          <div className="mb-7 h-3 overflow-hidden rounded-full bg-slate-100"><div className="h-full w-[68%] rounded-full bg-emerald-500" /></div>
          <div className="grid grid-cols-3 gap-3"><Stat value="12" label="Chapters completed" icon={BookOpen} /><Stat value="8" label="Quizzes completed" icon={CircleHelp} /><Stat value="45" label="Flashcards reviewed" icon={Layers3} /></div>
        </article>
        <article className="relative overflow-hidden rounded-2xl bg-slate-900 p-6 text-white shadow-sm sm:p-7"><div className="absolute -right-12 -top-12 h-36 w-36 rounded-full bg-emerald-500/20" /><div className="relative flex h-full flex-col justify-between"><div><div className="mb-4 flex items-center justify-between"><span className="rounded-full bg-emerald-400/15 px-3 py-1 text-xs font-bold uppercase tracking-wider text-emerald-300">Continue learning</span><Play size={19} className="text-emerald-300" /></div><p className="text-sm text-slate-400">Science</p><h2 className="mt-1 text-2xl font-bold text-white">Electricity</h2></div><div className="mt-7"><div className="mb-2 flex justify-between text-sm"><span className="text-slate-400">Chapter progress</span><span className="font-bold text-emerald-300">65%</span></div><div className="mb-5 h-2 overflow-hidden rounded-full bg-white/10"><div className="h-full w-[65%] rounded-full bg-emerald-400" /></div><Link to="/chapters/electricity" className="inline-flex items-center gap-2 rounded-xl bg-emerald-400 px-4 py-3 text-sm font-bold text-slate-950 transition hover:bg-emerald-300">Continue Learning <ArrowRight size={17} /></Link></div></div></article>
      </section>

      <section><SectionHeading title="My Subjects" link="/subjects" linkLabel="View all" /><div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{subjects.map((subject) => <SubjectCard key={subject.name} {...subject} />)}</div></section>

      <section><SectionHeading title="Quick Actions" /><div className="grid grid-cols-2 gap-3 lg:grid-cols-4"><ActionCard to="/subjects" icon={BookOpen} label="Browse Subjects" color="emerald" /><ActionCard to="/flashcards" icon={Layers3} label="Flashcards" color="indigo" /><ActionCard to="/quiz" icon={CircleHelp} label="Take a Quiz" color="amber" /><ActionCard to="/chatbot" icon={MessageCircle} label="Ask AI Tutor" color="rose" /></div></section>

      <section className="grid gap-6 xl:grid-cols-[1.35fr_0.65fr]">
        <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"><SectionHeading title="Recent Activity" /><div className="divide-y divide-slate-100">{activities.map(({ text, detail, icon: Icon, color }) => <div key={text} className="flex items-center gap-3 py-4 first:pt-1"><span className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl ${tone(color)}`}><Icon size={18} /></span><p className="min-w-0 flex-1 text-sm font-semibold text-slate-700">{text}</p><span className="shrink-0 text-xs font-semibold text-slate-400">{detail}</span></div>)}</div></article>
        <article className="rounded-2xl bg-orange-50 p-6 ring-1 ring-orange-100"><div className="mb-5 flex items-center justify-between"><span className="grid h-11 w-11 place-items-center rounded-xl bg-orange-100 text-orange-600"><Flame size={24} /></span><span className="text-3xl" aria-hidden="true">🔥</span></div><p className="text-sm font-semibold text-orange-700">Learning Streak</p><h2 className="mt-1 text-2xl font-bold text-slate-900">5 day learning streak</h2><p className="mt-2 text-sm text-slate-600">Keep learning every day!</p></article>
      </section>

      <section className="flex flex-col gap-5 rounded-2xl border border-indigo-100 bg-indigo-50 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-7"><div className="flex items-start gap-4"><span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-white text-indigo-600 shadow-sm"><Target size={23} /></span><div><p className="text-sm font-semibold uppercase tracking-wider text-indigo-600">Recommended for You</p><h2 className="mt-1 text-xl font-bold text-slate-900">Revise: Ohm&apos;s Law</h2><p className="mt-1 text-sm text-slate-600">You scored 60% in your recent Electricity quiz.</p></div></div><Link to="/flashcards" className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-indigo-700">Start Revision <ChevronRight size={17} /></Link></section>
    </div>
  )
}

function SectionHeading({ title, link, linkLabel }) { return <div className="mb-4 flex items-center justify-between"><h2 className="text-xl font-bold text-slate-900">{title}</h2>{link && <Link to={link} className="text-sm font-bold text-emerald-700 hover:text-emerald-800">{linkLabel}</Link>}</div> }
function Stat({ value, label, icon: Icon }) { return <div className="min-w-0"><Icon size={17} className="mb-2 text-emerald-600" /><p className="text-2xl font-bold text-slate-900">{value}</p><p className="mt-1 text-xs leading-4 text-slate-500">{label}</p></div> }
function SubjectCard({ name, chapters, progress, color, icon: Icon }) { return <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><div className={`mb-5 grid h-11 w-11 place-items-center rounded-xl ${tone(color)}`}><Icon size={21} /></div><h3 className="font-bold text-slate-900">{name}</h3><p className="mt-1 text-sm text-slate-500">{chapters} chapters</p><div className="mt-5 flex justify-between text-xs font-bold"><span className="text-slate-400">Progress</span><span className="text-slate-700">{progress}%</span></div><div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100"><div className={`h-full rounded-full ${barTone(color)}`} style={{ width: `${progress}%` }} /></div><Link to="/chapters" className="mt-5 inline-flex items-center gap-1 text-sm font-bold text-emerald-700 hover:text-emerald-800">Continue <ArrowRight size={15} /></Link></article> }
function ActionCard({ to, icon: Icon, label, color }) { return <Link to={to} className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 text-sm font-bold text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md"><span className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl ${tone(color)}`}><Icon size={19} /></span><span>{label}</span><ChevronRight size={16} className="ml-auto text-slate-400" /></Link> }
function tone(color) { return { emerald: 'bg-emerald-50 text-emerald-700', indigo: 'bg-indigo-50 text-indigo-700', amber: 'bg-amber-50 text-amber-700', rose: 'bg-rose-50 text-rose-700' }[color] }
function barTone(color) { return { emerald: 'bg-emerald-500', indigo: 'bg-indigo-500', amber: 'bg-amber-500', rose: 'bg-rose-500' }[color] }
function FlaskIcon(props) { return <GraduationCap {...props} /> }
function GlobeIcon(props) { return <Award {...props} /> }

export default Dashboard