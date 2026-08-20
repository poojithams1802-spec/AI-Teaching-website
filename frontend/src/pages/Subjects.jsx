import { ArrowRight, BookOpen, Brain, FlaskConical, Globe2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { subjects } from '../data/subjects'

const icons = [Brain, FlaskConical, Globe2, BookOpen]
const colors = ['indigo', 'emerald', 'amber', 'rose']

function Subjects() {
  return (
    <div className="mx-auto w-full max-w-7xl space-y-6 p-4 sm:p-6 lg:p-8">
      <header><p className="text-sm font-semibold uppercase tracking-[0.16em] text-emerald-600">Your curriculum</p><h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Subjects</h1><p className="mt-2 text-slate-500">Explore your NCERT subjects and keep making progress.</p></header>
      <section className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {subjects.map((subject, index) => {
          const Icon = icons[index % icons.length]
          const color = colors[index % colors.length]
          return <article key={subject.id} className="flex flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"><span className={`mb-6 grid h-12 w-12 place-items-center rounded-xl ${iconTone(color)}`}><Icon size={23} /></span><h2 className="text-xl font-bold text-slate-900">{subject.name}</h2><p className="mt-2 min-h-12 text-sm leading-6 text-slate-500">{subject.description}</p><div className="mt-6 flex items-center justify-between text-sm"><span className="text-slate-500">{subject.chapters} chapters</span><span className="font-bold text-slate-700">{subject.progress}%</span></div><div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100"><div className={`h-full rounded-full ${barTone(color)}`} style={{ width: `${subject.progress}%` }} /></div><Link to={`/chapters/${subject.id}`} className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-emerald-700">View Chapters <ArrowRight size={16} /></Link></article>
        })}
      </section>
    </div>
  )
}

function iconTone(color) { return { indigo: 'bg-indigo-50 text-indigo-700', emerald: 'bg-emerald-50 text-emerald-700', amber: 'bg-amber-50 text-amber-700', rose: 'bg-rose-50 text-rose-700' }[color] }
function barTone(color) { return { indigo: 'bg-indigo-500', emerald: 'bg-emerald-500', amber: 'bg-amber-500', rose: 'bg-rose-500' }[color] }

export default Subjects