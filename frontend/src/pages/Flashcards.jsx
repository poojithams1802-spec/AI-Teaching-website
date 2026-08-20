import { useState } from 'react'
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  RotateCcw,
  Shuffle,
  ThumbsUp,
  X,
} from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { chapters } from '../data/chapters'
import { flashcards } from '../data/flashcards'

function Flashcards() {
  const { chapterId } = useParams()
  const chapter = chapters.find((item) => item.id === chapterId)
  const sourceCards = flashcards.filter((card) => card.chapterId === chapterId)

  if (!chapterId || !sourceCards.length) {
    return (
      <main className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-3xl flex-col items-center justify-center p-6 text-center">
        <span className="grid h-16 w-16 place-items-center rounded-2xl bg-emerald-50 text-emerald-600"><BookOpen size={30} /></span>
        <h1 className="mt-5 text-3xl font-bold text-slate-900">Flashcards unavailable</h1>
        <p className="mt-2 text-slate-500">Choose a chapter to review its flashcards.</p>
        <Link to="/subjects" className="mt-6 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-emerald-700">Browse Subjects</Link>
      </main>
    )
  }

  return <FlashcardDeck chapter={chapter} sourceCards={sourceCards} />
}

function FlashcardDeck({ chapter, sourceCards }) {
  const [cards, setCards] = useState(sourceCards)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showAnswer, setShowAnswer] = useState(false)
  const [reviewedCards, setReviewedCards] = useState([])
  const [status, setStatus] = useState('')
  const currentCard = cards[currentIndex]
  const isFirstCard = currentIndex === 0
  const isLastCard = currentIndex === cards.length - 1
  const reviewedCount = reviewedCards.length

  function markKnown() {
    setReviewedCards((reviewed) => reviewed.includes(currentCard.id) ? reviewed : [...reviewed, currentCard.id])
    setStatus('Marked as known. Nice work!')
  }

  function reviewAgain() {
    setStatus('Saved for another review.')
    setShowAnswer(false)
  }

  function moveCard(direction) {
    setCurrentIndex((index) => index + direction)
    setShowAnswer(false)
    setStatus('')
  }

  function shuffleCards() {
    const shuffled = [...cards]
    for (let index = shuffled.length - 1; index > 0; index -= 1) {
      const randomIndex = Math.floor(Math.random() * (index + 1))
      ;[shuffled[index], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[index]]
    }
    setCards(shuffled)
    setCurrentIndex(0)
    setShowAnswer(false)
    setStatus('Cards shuffled.')
  }

  function restartDeck() {
    setCards(sourceCards)
    setCurrentIndex(0)
    setShowAnswer(false)
    setReviewedCards([])
    setStatus('')
  }

  return (
    <div className="mx-auto w-full max-w-5xl space-y-6 p-4 sm:p-6 lg:p-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Link to={`/chapter/${chapter.id}`} className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 transition hover:text-emerald-700"><ArrowLeft size={17} /> Exit Flashcards</Link>
        <button type="button" onClick={shuffleCards} className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-bold text-slate-600 transition hover:border-emerald-200 hover:text-emerald-700"><Shuffle size={16} /> Shuffle Cards</button>
      </div>

      <header className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:p-8"><div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><p className="text-sm font-semibold uppercase tracking-[0.16em] text-emerald-600">Study mode</p><h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Flashcards</h1><p className="mt-2 text-slate-500">{chapter.name}</p></div><span className="text-sm font-bold text-slate-500">Card {currentIndex + 1} of {cards.length}</span></div><div className="mt-6 h-2 overflow-hidden rounded-full bg-slate-100"><div className="h-full rounded-full bg-emerald-500 transition-all" style={{ width: `${((currentIndex + 1) / cards.length) * 100}%` }} /></div></header>

      <section className="mx-auto w-full max-w-3xl"><button type="button" onClick={() => setShowAnswer((visible) => !visible)} className="flex min-h-[21rem] w-full flex-col items-center justify-center rounded-3xl bg-emerald-700 p-8 text-center text-white shadow-xl shadow-emerald-900/15 transition hover:bg-emerald-800 sm:min-h-[26rem] sm:p-12"><span className="mb-6 rounded-full bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-emerald-100">{showAnswer ? 'Answer' : 'Question'}</span><span className="max-w-2xl text-2xl font-bold leading-tight sm:text-3xl">{showAnswer ? currentCard.answer : currentCard.question}</span><span className="mt-8 text-sm text-emerald-100">{showAnswer ? 'Show Question' : 'Show Answer'}</span></button><div className="mt-5 flex flex-wrap items-center justify-center gap-3"><button type="button" onClick={markKnown} className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-emerald-700"><ThumbsUp size={17} /> I Know This</button><button type="button" onClick={reviewAgain} className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-600 transition hover:border-amber-200 hover:text-amber-700"><RotateCcw size={17} /> Review Again</button></div>{status && <p role="status" className="mt-3 text-center text-sm font-semibold text-emerald-700">{status}</p>}</section>

      <div className="flex items-center justify-center gap-3"><button type="button" disabled={isFirstCard} onClick={() => moveCard(-1)} className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-600 transition hover:border-emerald-200 hover:text-emerald-700 disabled:cursor-not-allowed disabled:opacity-40"><ArrowLeft size={17} /> Previous</button><button type="button" disabled={isLastCard} onClick={() => moveCard(1)} className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-3 text-sm font-bold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-40">Next <ArrowRight size={17} /></button></div>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"><div className="flex items-center justify-between gap-3"><div><h2 className="text-lg font-bold text-slate-900">Your Progress</h2><p className="mt-1 text-sm text-slate-500">{reviewedCount} / {cards.length} cards reviewed</p></div><CheckCircle2 className="text-emerald-600" size={24} /></div><div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100"><div className="h-full rounded-full bg-emerald-500 transition-all" style={{ width: `${(reviewedCount / cards.length) * 100}%` }} /></div></section>

      {isLastCard && <section className="rounded-2xl bg-indigo-600 p-6 text-white shadow-lg shadow-indigo-900/15 sm:p-8"><div className="flex flex-col items-center text-center"><span className="text-4xl" aria-hidden="true">🎉</span><h2 className="mt-3 text-2xl font-bold text-white">Great job!</h2><p className="mt-2 text-indigo-100">You&apos;ve completed this flashcard set.</p><div className="mt-5 flex flex-wrap justify-center gap-3"><button type="button" onClick={restartDeck} className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-bold text-indigo-700 transition hover:bg-indigo-50"><RotateCcw size={17} /> Review Again</button><Link to={`/chapter/${chapter.id}`} className="inline-flex items-center gap-2 rounded-xl bg-indigo-500 px-4 py-3 text-sm font-bold text-white transition hover:bg-indigo-400"><X size={17} /> Back to Chapter</Link></div></div></section>}
    </div>
  )
}

export default Flashcards
