import {
  Award,
  BarChart3,
  BookOpen,
  Brain,
  Check,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Flame,
  Layers3,
  LockKeyhole,
  Medal,
  Play,
  Target,
  Trophy,
  Zap,
} from 'lucide-react'
import { Link } from 'react-router-dom'

const subjectProgress = [
  { name: 'Mathematics', completed: 10, total: 15, progress: 72, color: 'indigo', icon: Brain },
  { name: 'Science', completed: 8, total: 12, progress: 68, color: 'emerald', icon: FlaskIcon },
  { name: 'Social Science', completed: 11, total: 20, progress: 54, color: 'amber', icon: GlobeIcon },
  { name: 'English', completed: 9, total: 11, progress: 81, color: 'rose', icon: BookOpen },
]

const recentChapters = [
  { name: 'Chemical Reactions and Equations', subject: 'Science', progress: 85, id: 'chemical-reactions' },
  { name: 'Electricity', subject: 'Science', progress: 65, id: 'electricity' },
  { name: 'Real Numbers', subject: 'Mathematics', progress: 100, id: 'real-numbers' },
]

const quizResults = [
  { name: 'Chemical Reactions', score: 80 },
  { name: 'Electricity', score: 90 },
  { name: 'Real Numbers', score: 75 },
]

const activities = [
  ['Completed Chemical Reactions chapter', 'Today', CheckCircle2, 'emerald'],
  ['Scored 80% in Chemical Reactions quiz', 'Today', Trophy, 'indigo'],
  ['Reviewed 15 flashcards', 'Yesterday', Layers3, 'amber'],
  ['Completed Electricity topic', 'Yesterday', Check, 'emerald'],
  ['Started Real Numbers chapter', '2 days ago', Play, 'rose'],
]

const achievements = [
  ['First Quiz', 'Completed your first quiz', Trophy, true],
  ['5 Day Streak', 'Learned for 5 consecutive days', Flame, true],
  ['Chapter Master', 'Completed 10 chapters', Award, true],
  ['Flashcard Pro', 'Reviewed 50 flashcards', Layers3, false],
]

function Progress() {
  return (
    <div className="mx-auto w-full max-w-7xl space-y-7 p-4 sm:p-6 lg:p-8">
      <header className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end"><div><p className="text-sm font-semibold uppercase tracking-[0.16em] text-emerald-600">Your learning analytics</p><h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Your Learning Progress</h1><p className="mt-2 text-slate-500">Track your learning journey and see how far you&apos;ve come.</p></div><p className="flex items-center gap-2 text-sm font-semibold text-slate-500"><Clock3 size={17} className="text-emerald-600" /> Keep learning every day!</p></header>

      <section className="grid gap-6 lg:grid-cols-[1fr_1.4fr]"><article className="rounded-2xl bg-emerald-700 p-6 text-white shadow-lg shadow-emerald-900/10 sm:p-8"><div className="flex items-start justify-between"><div><p className="text-sm font-semibold uppercase tracking-wider text-emerald-100">Overall Progress</p><p className="mt-3 text-5xl font-bold text-white">72%</p><p className="mt-2 text-sm text-emerald-100">You&apos;re making excellent progress.</p></div><div className="grid h-20 w-20 place-items-center rounded-full border-8 border-emerald-400/30 border-t-emerald-200"><Target size={27} className="text-emerald-100" /></div></div><div className="mt-8 h-3 overflow-hidden rounded-full bg-emerald-900/30"><div className="h-full w-[72%] rounded-full bg-emerald-200" /></div></article><div className="grid grid-cols-2 gap-4 sm:grid-cols-4"><Metric value="12" label="Chapters Completed" icon={BookOpen} color="emerald" /><Metric value="8" label="Quizzes Completed" icon={Trophy} color="indigo" /><Metric value="45" label="Flashcards Reviewed" icon={Layers3} color="amber" /><Metric value="5 days" label="Learning Streak" icon={Flame} color="rose" /></div></section>

      <section><SectionTitle title="Subject Progress" icon={BarChart3} /><div className="grid gap-4 md:grid-cols-2">{subjectProgress.map((subject) => <SubjectRow key={subject.name} {...subject} />)}</div></section>

      <section><SectionTitle title="Recently Studied Chapters" icon={BookOpen} /><div className="grid gap-4 lg:grid-cols-3">{recentChapters.map((chapter) => <article key={chapter.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><div className="flex items-start justify-between gap-3"><div><h3 className="font-bold text-slate-900">{chapter.name}</h3><p className="mt-1 text-sm text-slate-500">{chapter.subject}</p></div><span className="text-sm font-bold text-emerald-700">{chapter.progress}%</span></div><div className="mt-5 h-2 overflow-hidden rounded-full bg-slate-100"><div className="h-full rounded-full bg-emerald-500" style={{ width: `${chapter.progress}%` }} /></div><Link to={`/chapter/${chapter.id}`} className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-emerald-700 hover:text-emerald-800">Continue <ChevronRight size={16} /></Link></article>)}</div></section>

      <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]"><article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"><SectionTitle title="Quiz Performance" icon={Trophy} /><div className="mb-6 grid grid-cols-3 gap-3"><Metric value="78%" label="Average Quiz Score" icon={Target} color="indigo" /><Metric value="8" label="Quizzes Completed" icon={CheckCircle2} color="emerald" /><Metric value="95%" label="Best Score" icon={Medal} color="amber" /></div><div className="space-y-4">{quizResults.map((result) => <div key={result.name}><div className="mb-1.5 flex justify-between text-sm"><span className="font-semibold text-slate-600">{result.name}</span><span className="font-bold text-slate-800">{result.score}%</span></div><div className="h-2 overflow-hidden rounded-full bg-slate-100"><div className="h-full rounded-full bg-indigo-500" style={{ width: `${result.score}%` }} /></div></div>)}</div></article><article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"><SectionTitle title="Flashcard Activity" icon={Layers3} /><p className="mt-5 text-3xl font-bold text-slate-900">45 <span className="text-base font-medium text-slate-500">cards reviewed</span></p><div className="mt-6 space-y-4"><Breakdown label="38 cards known" value={38} total={45} color="bg-emerald-500" /><Breakdown label="7 cards need review" value={7} total={45} color="bg-amber-400" /></div></article></section>

      <section className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]"><article className="rounded-2xl bg-orange-50 p-6 ring-1 ring-orange-100"><div className="flex items-start justify-between"><div><p className="text-sm font-bold uppercase tracking-wider text-orange-700">Learning Streak</p><h2 className="mt-2 text-2xl font-bold text-slate-900">🔥 5 Day Learning Streak</h2><p className="mt-2 text-sm text-slate-600">You&apos;re building a great learning habit!</p></div><Flame size={30} className="text-orange-500" /></div><div className="mt-7 grid grid-cols-7 gap-2">{['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, index) => <div key={`${day}-${index}`} className="text-center"><span className="text-xs font-bold text-orange-700">{day}</span><span className={`mx-auto mt-2 grid h-8 w-8 place-items-center rounded-full ${index < 5 ? 'bg-orange-500 text-white' : 'bg-white text-orange-300'}`}>{index < 5 ? <Check size={15} /> : <span className="h-1.5 w-1.5 rounded-full bg-orange-200" />}</span></div>)}</div></article><article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"><SectionTitle title="Recent Activity" icon={Clock3} /><div className="mt-4 space-y-1">{activities.map(([text, time, Icon, color]) => <div key={text} className="flex items-center gap-3 py-2.5"><span className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl ${tone(color)}`}><Icon size={17} /></span><p className="flex-1 text-sm font-semibold text-slate-700">{text}</p><span className="shrink-0 text-xs font-semibold text-slate-400">{time}</span></div>)}</div></article></section>

      <section><SectionTitle title="Achievements" icon={Award} /><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{achievements.map(([title, description, Icon, unlocked]) => <article key={title} className={`rounded-2xl border p-5 ${unlocked ? 'border-amber-100 bg-amber-50/60' : 'border-slate-200 bg-slate-50 opacity-65'}`}><span className={`grid h-12 w-12 place-items-center rounded-xl ${unlocked ? 'bg-amber-100 text-amber-600' : 'bg-slate-200 text-slate-400'}`}>{unlocked ? <Icon size={23} /> : <LockKeyhole size={21} />}</span><h3 className="mt-4 font-bold text-slate-900">{title}</h3><p className="mt-1 text-sm leading-5 text-slate-500">{description}</p></article>)}</div></section>

      <section className="flex flex-col justify-between gap-5 rounded-2xl bg-slate-900 p-6 text-white shadow-lg sm:flex-row sm:items-center sm:p-8"><div><p className="text-sm font-bold uppercase tracking-[0.16em] text-emerald-300">Keep Learning</p><h2 className="mt-2 text-2xl font-bold text-white">You&apos;re doing great!</h2><p className="mt-1 text-slate-300">Continue where you left off with Chemical Reactions and Equations.</p></div><Link to="/chapter/chemical-reactions" className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-emerald-400 px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-emerald-300">Continue Learning <ChevronRight size={17} /></Link></section>
    </div>
  )
}

function SectionTitle({ title, icon: Icon }) { return <div className="mb-4 flex items-center gap-2"><span className="text-emerald-600"><Icon size={21} /></span><h2 className="text-xl font-bold text-slate-900">{title}</h2></div> }
function Metric({ value, label, icon: Icon, color }) { return <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"><span className={`grid h-9 w-9 place-items-center rounded-lg ${tone(color)}`}><Icon size={17} /></span><p className="mt-3 text-xl font-bold text-slate-900">{value}</p><p className="mt-1 text-xs leading-4 text-slate-500">{label}</p></div> }
function SubjectRow({ name, completed, total, progress, color, icon: Icon }) { return <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><div className="flex items-center gap-3"><span className={`grid h-10 w-10 place-items-center rounded-xl ${tone(color)}`}><Icon size={19} /></span><div className="min-w-0 flex-1"><div className="flex justify-between gap-3"><h3 className="font-bold text-slate-900">{name}</h3><span className="text-sm font-bold text-slate-700">{progress}%</span></div><p className="mt-1 text-sm text-slate-500">{completed} / {total} chapters completed</p></div></div><div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100"><div className={`h-full rounded-full ${barTone(color)}`} style={{ width: `${progress}%` }} /></div></article> }
function Breakdown({ label, value, total, color }) { return <div><div className="mb-1.5 flex justify-between text-sm"><span className="font-semibold text-slate-600">{label}</span><span className="font-bold text-slate-700">{value}</span></div><div className="h-2 overflow-hidden rounded-full bg-slate-100"><div className={`h-full rounded-full ${color}`} style={{ width: `${(value / total) * 100}%` }} /></div></div> }
function tone(color) { return { emerald: 'bg-emerald-50 text-emerald-700', indigo: 'bg-indigo-50 text-indigo-700', amber: 'bg-amber-50 text-amber-700', rose: 'bg-rose-50 text-rose-700' }[color] }
function barTone(color) { return { emerald: 'bg-emerald-500', indigo: 'bg-indigo-500', amber: 'bg-amber-500', rose: 'bg-rose-500' }[color] }
function FlaskIcon(props) { return <Zap {...props} /> }
function GlobeIcon(props) { return <BarChart3 {...props} /> }

export default Progress
