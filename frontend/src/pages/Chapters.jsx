import { ArrowLeft, BookOpen, CheckCircle2 } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import ChapterCard from '../components/ChapterCard'
import { chapters } from '../data/chapters'
import { subjects } from '../data/subjects'

function Chapters() {
  const { subjectId } = useParams()
  const subject = subjects.find((item) => item.id === subjectId)

  if (!subject) {
    return <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-3xl flex-col items-center justify-center p-6 text-center"><span className="grid h-16 w-16 place-items-center rounded-2xl bg-amber-50 text-amber-600"><BookOpen size={30} /></span><h1 className="mt-5 text-3xl font-bold text-slate-900">Subject not found</h1><p className="mt-2 text-slate-500">We could not find the subject you are looking for.</p><Link to="/subjects" className="mt-6 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-emerald-700">Back to Subjects</Link></div>
  }

  const subjectChapters = chapters.filter((chapter) => chapter.subjectId === subject.id)

  return (
    <div className="mx-auto w-full max-w-7xl space-y-6 p-4 sm:p-6 lg:p-8">
      <Link to="/subjects" className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 transition hover:text-emerald-700"><ArrowLeft size={17} /> All Subjects</Link>
      <header className="rounded-2xl bg-emerald-700 p-6 text-white shadow-lg shadow-emerald-900/10 sm:p-8"><p className="text-sm font-semibold uppercase tracking-[0.16em] text-emerald-100">Subject pathway</p><h1 className="mt-2 text-3xl font-bold text-white sm:text-4xl">{subject.name}</h1><p className="mt-2 max-w-2xl text-emerald-50">{subject.description}</p><div className="mt-7 grid max-w-lg grid-cols-2 gap-4 sm:grid-cols-3"><div><p className="text-2xl font-bold">{subject.progress}%</p><p className="text-xs text-emerald-100">Overall progress</p></div><div><p className="text-2xl font-bold">{subjectChapters.length || subject.chapters}</p><p className="text-xs text-emerald-100">Chapters available</p></div><div className="hidden sm:block"><p className="flex items-center gap-1 text-2xl font-bold"><CheckCircle2 size={21} /> {subjectChapters.filter((chapter) => chapter.progress === 100).length}</p><p className="text-xs text-emerald-100">Completed chapters</p></div></div></header>
      <section><div className="mb-4 flex items-end justify-between gap-4"><div><h2 className="text-2xl font-bold text-slate-900">All Chapters</h2><p className="mt-1 text-sm text-slate-500">Choose a chapter to start learning.</p></div><span className="text-sm font-semibold text-slate-500">{subjectChapters.length} chapters</span></div><div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">{subjectChapters.map((chapter) => <ChapterCard key={chapter.id} chapter={chapter} />)}</div></section>
    </div>
  )
}

export default Chapters