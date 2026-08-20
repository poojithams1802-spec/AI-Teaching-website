import { useEffect, useState } from 'react'
import { ArrowLeft, ArrowRight, Check, CheckCircle2, CircleAlert, Clock3, RotateCcw, X } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { chapters } from '../data/chapters'
import { quizzes } from '../data/quizzes'

function Quiz() {
  const { chapterId } = useParams()
  const chapter = chapters.find((item) => item.id === chapterId)
  const questions = quizzes.filter((item) => item.chapterId === chapterId)

  if (!chapterId || !questions.length) return <EmptyQuiz />
  return <QuizSession chapter={chapter} questions={questions} />
}

function EmptyQuiz() {
  return <main className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-3xl flex-col items-center justify-center p-6 text-center"><span className="grid h-16 w-16 place-items-center rounded-2xl bg-amber-50 text-amber-600"><CircleAlert size={30} /></span><h1 className="mt-5 text-3xl font-bold text-slate-900">Quiz unavailable</h1><p className="mt-2 text-slate-500">Choose a chapter with an available quiz to begin.</p><Link to="/subjects" className="mt-6 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-emerald-700">Browse Subjects</Link></main>
}

function QuizSession({ chapter, questions }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [secondsLeft, setSecondsLeft] = useState(600)
  const currentQuestion = questions[currentIndex]

  useEffect(() => {
    if (submitted) return undefined
    const timer = setInterval(() => setSecondsLeft((seconds) => seconds - 1), 1000)
    const submitTimer = setTimeout(() => setSubmitted(true), 600000)
    return () => {
      clearInterval(timer)
      clearTimeout(submitTimer)
    }
  }, [submitted])

  function selectAnswer(optionIndex) {
    setAnswers((selected) => ({ ...selected, [currentQuestion.id]: optionIndex }))
  }

  function retryQuiz() {
    setCurrentIndex(0)
    setAnswers({})
    setSecondsLeft(600)
    setSubmitted(false)
  }

  if (submitted) return <QuizResults chapter={chapter} questions={questions} answers={answers} onRetry={retryQuiz} />

  const selectedAnswer = answers[currentQuestion.id]
  const minutes = Math.floor(secondsLeft / 60).toString().padStart(2, '0')
  const seconds = (secondsLeft % 60).toString().padStart(2, '0')
  const isLastQuestion = currentIndex === questions.length - 1

  return <div className="mx-auto w-full max-w-4xl space-y-6 p-4 sm:p-6 lg:p-8"><div className="flex flex-wrap items-center justify-between gap-3"><Link to={`/chapter/${chapter.id}`} className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 transition hover:text-emerald-700"><ArrowLeft size={17} /> Exit Quiz</Link><span className={`inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-bold ${secondsLeft < 60 ? 'bg-red-50 text-red-600' : 'bg-white text-slate-600 ring-1 ring-slate-200'}`}><Clock3 size={17} /> {minutes}:{seconds}</span></div>
    <header className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:p-8"><div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><p className="text-sm font-semibold uppercase tracking-[0.16em] text-emerald-600">Knowledge check</p><h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Chapter Quiz</h1><p className="mt-2 text-slate-500">{chapter.name}</p></div><span className="text-sm font-bold text-slate-500">Question {currentIndex + 1} of {questions.length}</span></div><div className="mt-6 h-2 overflow-hidden rounded-full bg-slate-100"><div className="h-full rounded-full bg-emerald-500 transition-all" style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }} /></div></header>
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"><p className="text-sm font-bold text-emerald-600">Question {currentIndex + 1}</p><h2 className="mt-3 text-2xl font-bold leading-tight text-slate-900">{currentQuestion.question}</h2><div className="mt-7 space-y-3">{currentQuestion.options.map((option, optionIndex) => { const selected = selectedAnswer === optionIndex; return <button key={option} type="button" onClick={() => selectAnswer(optionIndex)} className={`flex w-full items-start gap-3 rounded-xl border p-4 text-left text-sm font-semibold transition ${selected ? 'border-emerald-500 bg-emerald-50 text-emerald-800 ring-2 ring-emerald-100' : 'border-slate-200 text-slate-700 hover:border-emerald-200 hover:bg-slate-50'}`}><span className={`grid h-7 w-7 shrink-0 place-items-center rounded-full text-xs ${selected ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-500'}`}>{String.fromCharCode(65 + optionIndex)}</span><span className="pt-1">{option}</span></button> })}</div></section>
    <div className="flex items-center justify-between gap-3"><button type="button" disabled={currentIndex === 0} onClick={() => setCurrentIndex((index) => index - 1)} className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-600 transition hover:border-emerald-200 hover:text-emerald-700 disabled:cursor-not-allowed disabled:opacity-40"><ArrowLeft size={17} /> Previous</button>{isLastQuestion ? <button type="button" onClick={() => setSubmitted(true)} className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-emerald-700">Submit Quiz <Check size={17} /></button> : <button type="button" onClick={() => setCurrentIndex((index) => index + 1)} className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-bold text-white transition hover:bg-slate-700">Next <ArrowRight size={17} /></button>}</div>
  </div>
}

function QuizResults({ chapter, questions, answers, onRetry }) {
  const correctCount = questions.reduce((total, question) => total + (answers[question.id] === question.correctAnswer ? 1 : 0), 0)
  const incorrectCount = questions.length - correctCount
  const percentage = Math.round((correctCount / questions.length) * 100)

  return <div className="mx-auto w-full max-w-5xl space-y-6 p-4 sm:p-6 lg:p-8"><header className="rounded-2xl bg-indigo-600 p-7 text-center text-white shadow-lg shadow-indigo-900/15 sm:p-10"><div className="mx-auto grid h-20 w-20 place-items-center rounded-full border-8 border-white/20 border-t-white text-xl font-bold">{percentage}%</div><p className="mt-5 text-4xl" aria-hidden="true">🎉</p><h1 className="mt-2 text-3xl font-bold text-white">Quiz Completed!</h1><p className="mt-2 text-indigo-100">{chapter.name}</p><div className="mx-auto mt-6 grid max-w-xl grid-cols-3 gap-3"><ResultStat value={`${correctCount} / ${questions.length}`} label="Score" /><ResultStat value={`${percentage}%`} label="Percentage" /><ResultStat value={`${incorrectCount}`} label="Incorrect" /></div></header>
    <div className="flex flex-wrap justify-center gap-3"><button type="button" onClick={onRetry} className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-emerald-700"><RotateCcw size={17} /> Retry Quiz</button><Link to={`/chapter/${chapter.id}`} className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 transition hover:border-emerald-200 hover:text-emerald-700"><ArrowLeft size={17} /> Back to Chapter</Link></div>
    <section className="space-y-4"><h2 className="text-2xl font-bold text-slate-900">Answer Review</h2>{questions.map((question, index) => { const selected = answers[question.id]; const isCorrect = selected === question.correctAnswer; return <article key={question.id} className={`rounded-2xl border bg-white p-5 shadow-sm ${isCorrect ? 'border-emerald-200' : 'border-red-200'}`}><div className="flex items-start gap-3"><span className={`mt-0.5 ${isCorrect ? 'text-emerald-600' : 'text-red-500'}`}>{isCorrect ? <CheckCircle2 size={20} /> : <X size={20} />}</span><div className="min-w-0 flex-1"><p className="text-xs font-bold uppercase tracking-wider text-slate-400">Question {index + 1}</p><h3 className="mt-1 font-bold text-slate-900">{question.question}</h3><p className="mt-4 text-sm"><span className="font-semibold text-slate-500">Your answer: </span><span className={isCorrect ? 'font-semibold text-emerald-700' : 'font-semibold text-red-600'}>{selected === undefined ? 'Not answered' : question.options[selected]}</span></p>{!isCorrect && <p className="mt-2 text-sm"><span className="font-semibold text-slate-500">Correct answer: </span><span className="font-semibold text-emerald-700">{question.options[question.correctAnswer]}</span></p>}<p className="mt-3 rounded-lg bg-slate-50 p-3 text-sm leading-6 text-slate-600"><span className="font-semibold text-slate-800">Explanation: </span>{question.explanation}</p></div></div></article> })}</section>
  </div>
}

function ResultStat({ value, label }) { return <div className="rounded-xl bg-white/10 px-3 py-3"><p className="text-xl font-bold text-white">{value}</p><p className="mt-1 text-xs text-indigo-100">{label}</p></div> }

export default Quiz
