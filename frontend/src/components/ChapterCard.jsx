import { BookOpen, Clock3, Signal } from 'lucide-react'
import { Link } from 'react-router-dom'

function ChapterCard({ chapter }) {
  const difficultyColor = {
    Easy: 'bg-emerald-50 text-emerald-700',
    Medium: 'bg-amber-50 text-amber-700',
    Hard: 'bg-rose-50 text-rose-700',
  }[chapter.difficulty] || 'bg-slate-100 text-slate-600'

  return (
    <article className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-200 hover:shadow-md">
      <div className="mb-5 flex items-start justify-between gap-3">
        <span className="grid h-11 w-11 place-items-center rounded-xl bg-emerald-50 text-emerald-700"><BookOpen size={21} /></span>
        <span className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide ${difficultyColor}`}>{chapter.difficulty}</span>
      </div>
      <p className="text-xs font-bold uppercase tracking-wider text-emerald-600">Chapter {chapter.number}</p>
      <h2 className="mt-2 text-lg font-bold text-slate-900">{chapter.name}</h2>
      <p className="mt-2 flex-1 text-sm leading-6 text-slate-500">{chapter.description}</p>
      <div className="mt-5 flex items-center gap-1.5 text-xs font-semibold text-slate-500"><Clock3 size={15} /> Estimated time: {chapter.estimatedTime}<span className="ml-auto"><Signal size={15} /></span></div>
      <div className="mt-4 flex items-center justify-between text-xs font-bold"><span className="text-slate-400">Progress</span><span className="text-slate-700">{chapter.progress}%</span></div>
      <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100"><div className="h-full rounded-full bg-emerald-500" style={{ width: `${chapter.progress}%` }} /></div>
      <Link to={`/chapter/${chapter.id}`} className="mt-5 inline-flex items-center justify-center rounded-xl bg-emerald-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-emerald-700">Start Learning</Link>
    </article>
  )
}

export default ChapterCard
