import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Check,
  CheckCircle2,
  Clock3,
  Lightbulb,
  MessageCircle,
  Play,
  RotateCcw,
  Sparkles,
  Trophy,
} from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import VideoPlayer from '../components/VideoPlayer'
import { chapters } from '../data/chapters'
import { subjects } from '../data/subjects'

const chemicalConcepts = [
  ['Chemical reactions', 'A chemical reaction changes one or more substances into new substances with different properties.'],
  ['Chemical equations', 'Chemical equations use symbols and formulas to show the reactants and products in a reaction.'],
  ['Balancing chemical equations', 'An equation is balanced when the number of atoms of every element is equal on both sides.'],
  ['Types of chemical reactions', 'Combination, decomposition, displacement, and double displacement are common reaction types.'],
  ['Oxidation and reduction', 'Oxidation involves gain of oxygen or loss of hydrogen, while reduction is the opposite process.'],
  ['Corrosion', 'Corrosion is the slow damage of metals caused by reactions with air, moisture, or other substances.'],
  ['Rancidity', 'Rancidity is the unpleasant change in oils and fats caused by oxidation, often prevented by refrigeration.'],
]

const defaultConcepts = [
  ['Core ideas', 'Learn the key definitions, examples, and relationships in this chapter.'],
  ['Important terms', 'Use the highlighted terms to build a strong NCERT vocabulary.'],
  ['Worked examples', 'Follow each example carefully and connect it to the chapter concept.'],
  ['Practice strategy', 'Review the idea, solve a question, and check your reasoning.'],
]

function ChapterDetails() {
  const { chapterId } = useParams()
  const chapterIndex = chapters.findIndex((item) => item.id === chapterId)
  const chapter = chapters[chapterIndex]
  const subject = chapter ? subjects.find((item) => item.id === chapter.subjectId) : null

  if (!chapter || !subject) {
    return <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-3xl flex-col items-center justify-center p-6 text-center"><span className="grid h-16 w-16 place-items-center rounded-2xl bg-amber-50 text-amber-600"><BookOpen size={30} /></span><h1 className="mt-5 text-3xl font-bold text-slate-900">Chapter not found</h1><p className="mt-2 text-slate-500">We could not find this chapter in the learning library.</p><Link to="/subjects" className="mt-6 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-emerald-700">Back to Subjects</Link></div>
  }

  const concepts = chapter.id === 'chemical-reactions' ? chemicalConcepts : defaultConcepts
  const subjectChapters = chapters.filter((item) => item.subjectId === chapter.subjectId)
  const position = subjectChapters.findIndex((item) => item.id === chapter.id)
  const previousChapter = subjectChapters[position - 1]
  const nextChapter = subjectChapters[position + 1]

  return (
    <div className="mx-auto w-full max-w-7xl space-y-7 p-4 sm:p-6 lg:p-8">
      <nav className="flex flex-wrap items-center gap-2 text-sm text-slate-500" aria-label="Breadcrumb"><Link to="/subjects" className="font-semibold hover:text-emerald-700">Subjects</Link><span>/</span><Link to={`/chapters/${subject.id}`} className="font-semibold hover:text-emerald-700">{subject.name}</Link><span>/</span><span className="font-semibold text-slate-800">{chapter.name}</span></nav>

      <header className="rounded-2xl bg-emerald-700 p-6 text-white shadow-lg shadow-emerald-900/10 sm:p-8"><div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end"><div className="max-w-3xl"><p className="text-sm font-bold uppercase tracking-[0.16em] text-emerald-100">Chapter {chapter.number}</p><h1 className="mt-2 text-3xl font-bold leading-tight text-white sm:text-4xl">{chapter.name}</h1><p className="mt-3 text-emerald-50">{chapter.description}</p></div><div className="flex shrink-0 items-center gap-2 rounded-xl bg-white/10 px-4 py-3 text-sm font-bold text-emerald-50"><Trophy size={18} /> {chapter.progress}% complete</div></div><div className="mt-7"><div className="mb-2 flex justify-between text-sm"><span className="text-emerald-100">Current progress</span><span className="font-bold text-white">{chapter.progress}%</span></div><div className="h-3 overflow-hidden rounded-full bg-white/15"><div className="h-full rounded-full bg-emerald-300" style={{ width: `${chapter.progress}%` }} /></div></div><div className="mt-6 flex flex-wrap gap-3 text-sm"><span className="rounded-full bg-white/10 px-3 py-1.5">Difficulty: {chapter.difficulty}</span><span className="flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5"><Clock3 size={15} /> {chapter.estimatedTime}</span></div></header>

      <section className="space-y-4"><SectionHeading icon={Lightbulb} title="Learn" /><article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"><div className="mb-6"><h2 className="text-2xl font-bold text-slate-900">Key Concepts</h2><p className="mt-1 text-sm text-slate-500">Build your understanding one idea at a time.</p></div><div className="grid gap-4 md:grid-cols-2">{concepts.map(([title, explanation], index) => <div key={title} className="rounded-xl bg-slate-50 p-4"><div className="flex gap-3"><span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-emerald-100 text-sm font-bold text-emerald-700">{index + 1}</span><div><h3 className="font-bold text-slate-900">{title}</h3><p className="mt-1 text-sm leading-6 text-slate-600">{explanation}</p></div></div></div>)}</div><button type="button" className="mt-7 inline-flex items-center gap-2 rounded-xl border border-emerald-200 px-4 py-3 text-sm font-bold text-emerald-700 transition hover:bg-emerald-50"><CheckCircle2 size={18} /> Mark as completed</button></article></section>

      <section className="space-y-4"><SectionHeading icon={Play} title="Watch" /><article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"><h2 className="mb-1 text-2xl font-bold text-slate-900">Watch &amp; Learn</h2><p className="mb-5 text-sm text-slate-500">See the chapter concepts explained with visual examples.</p><VideoPlayer videoUrl={chapter.videoUrl} title={`${chapter.name} video lesson`} /><button type="button" className="mt-5 inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-sm font-bold text-slate-700 transition hover:border-emerald-200 hover:text-emerald-700"><Check size={18} /> Mark video as watched</button></article></section>

      <section className="grid gap-5 md:grid-cols-2"><LearningCard icon={RotateCcw} title="Flashcards" description="Review important concepts using quick flashcards." meta="10+ flashcards" to={`/flashcards/${chapter.id}`} action="Start Flashcards" color="indigo" /><LearningCard icon={BookOpen} title="Chapter Quiz" description="Test your understanding of this chapter." meta="10 questions  |  Multiple choice  |  10 minutes" to={`/quiz/${chapter.id}`} action="Start Quiz" color="amber" /></section>

      <section className="rounded-2xl bg-indigo-600 p-6 text-white shadow-lg shadow-indigo-900/10 sm:p-8"><div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center"><div><div className="flex items-center gap-2 text-indigo-100"><MessageCircle size={20} /><span className="text-sm font-bold uppercase tracking-[0.16em]">Ask NCERT Buddy</span></div><h2 className="mt-3 text-2xl font-bold text-white">Have a doubt? Learn it in simple language.</h2><p className="mt-2 max-w-2xl text-indigo-100">Ask our AI tutor to explain the concept in simple language.</p><div className="mt-5 flex flex-wrap gap-2">{['Explain this concept simply', 'Give me an example', 'What should I remember for the exam?'].map((question) => <span key={question} className="rounded-full bg-white/10 px-3 py-2 text-xs text-indigo-50">{question}</span>)}</div></div><Link to="/chatbot" className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-indigo-700 transition hover:bg-indigo-50">Ask AI Tutor <ArrowRight size={17} /></Link></div></section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"><SectionHeading icon={Sparkles} title="Learning Outcomes" /><p className="mb-5 text-sm text-slate-500">After completing this chapter, you should be able to...</p><div className="grid gap-3 md:grid-cols-2">{['Identify and describe different chemical reactions.', 'Write and balance common chemical equations.', 'Classify reactions using their key characteristics.', 'Explain oxidation, reduction, corrosion, and rancidity.', 'Apply these concepts to everyday examples.'].map((outcome) => <div key={outcome} className="flex items-start gap-3 text-sm text-slate-700"><span className="mt-0.5 text-emerald-600"><CheckCircle2 size={18} /></span><span>{outcome}</span></div>)}</div></section>

      <footer className="flex flex-col justify-between gap-3 border-t border-slate-200 pt-5 sm:flex-row"><ChapterNav to={previousChapter ? `/chapter/${previousChapter.id}` : `/chapters/${subject.id}`} label="Previous Chapter" icon={ArrowLeft} disabled={!previousChapter} /><ChapterNav to={nextChapter ? `/chapter/${nextChapter.id}` : `/chapters/${subject.id}`} label="Next Chapter" icon={ArrowRight} next disabled={!nextChapter} /></footer>
    </div>
  )
}

function SectionHeading({ icon: Icon, title }) { return <div className="flex items-center gap-2"><span className="text-emerald-600"><Icon size={21} /></span><h2 className="text-xl font-bold text-slate-900">{title}</h2></div> }
function LearningCard({ icon: Icon, title, description, meta, to, action, color }) { return <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"><span className={`grid h-11 w-11 place-items-center rounded-xl ${color === 'indigo' ? 'bg-indigo-50 text-indigo-700' : 'bg-amber-50 text-amber-700'}`}><Icon size={21} /></span><h2 className="mt-5 text-xl font-bold text-slate-900">{title}</h2><p className="mt-2 text-sm text-slate-500">{description}</p><p className="mt-4 text-xs font-bold uppercase tracking-wider text-slate-400">{meta}</p><Link to={to} className="mt-6 inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-3 text-sm font-bold text-white transition hover:bg-slate-700">{action} <ArrowRight size={16} /></Link></article> }
function ChapterNav({ to, label, icon: Icon, next = false, disabled }) { return disabled ? <span className={`inline-flex items-center gap-2 text-sm font-bold text-slate-300 ${next ? 'self-end' : ''}`}>{!next && <Icon size={17} />}{label}{next && <Icon size={17} />}</span> : <Link to={to} className={`inline-flex items-center gap-2 text-sm font-bold text-slate-600 transition hover:text-emerald-700 ${next ? 'self-end' : ''}`}>{!next && <Icon size={17} />}{label}{next && <Icon size={17} />}</Link> }

export default ChapterDetails
