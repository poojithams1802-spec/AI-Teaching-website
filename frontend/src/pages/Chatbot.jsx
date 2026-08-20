import { useEffect, useRef, useState } from 'react'
import {
  Bot,
  BookOpen,
  Brain,
  ChevronDown,
  FileText,
  Lightbulb,
  MessageCircle,
  PanelRight,
  Send,
  ShieldCheck,
  Sparkles,
  Trash2,
  UserRound,
} from 'lucide-react'

const suggestions = [
  'Explain chemical reactions simply',
  'What is oxidation?',
  'Give me an example of displacement reaction',
  'Quiz me on this chapter',
]

const quickActions = [
  { label: 'Explain Simply', text: 'Explain this chapter in very simple language.', icon: Lightbulb },
  { label: 'Give an Example', text: 'Give me a real-life example of this concept.', icon: FileText },
  { label: 'Quiz Me', text: 'Ask me 5 MCQs from this chapter.', icon: Brain },
  { label: 'Summarize Chapter', text: 'Give me a short summary of this chapter.', icon: BookOpen },
]

function Chatbot() {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [thinking, setThinking] = useState(false)
  const [contextOpen, setContextOpen] = useState(false)
  const messagesEndRef = useRef(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, thinking])

  function sendMessage(message = input) {
    const trimmedMessage = message.trim()
    if (!trimmedMessage || thinking) return

    setMessages((current) => [...current, { id: `${Date.now()}-user`, role: 'student', text: trimmedMessage }])
    setInput('')
    setThinking(true)
    window.setTimeout(() => {
      setMessages((current) => [...current, { id: `${Date.now()}-ai`, role: 'ai', text: getMockResponse(trimmedMessage) }])
      setThinking(false)
    }, 500)
  }

  function handleKeyDown(event) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      sendMessage()
    }
  }

  function clearChat() {
    setMessages([])
    setThinking(false)
    setInput('')
  }

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 p-4 sm:p-6 lg:p-8">
      <header className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><div className="flex flex-wrap items-center gap-3"><h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">🤖 NCERT Buddy AI Tutor</h1><span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-indigo-700">AI Tutor</span></div><p className="mt-2 text-slate-500">Ask questions about your NCERT subjects and get simple explanations.</p></div><p className="flex max-w-sm items-start gap-2 text-xs leading-5 text-slate-400"><ShieldCheck size={16} className="mt-0.5 shrink-0 text-emerald-600" /> Answers are for educational purposes and should be verified with your NCERT textbook.</p></header>

      <div className="grid min-h-[650px] gap-6 lg:grid-cols-[minmax(0,1fr)_280px]">
        <section className="flex min-h-[650px] min-w-0 flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"><div className="flex items-center justify-between border-b border-slate-100 px-5 py-4"><div className="flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-xl bg-indigo-100 text-indigo-700"><MessageCircle size={20} /></span><div><h2 className="font-bold text-slate-900">Ask your tutor</h2><p className="text-xs text-slate-500">Learning context: Science · Class 10</p></div></div><button type="button" onClick={clearChat} className="inline-flex items-center gap-2 rounded-lg px-2 py-2 text-xs font-bold text-slate-500 transition hover:bg-red-50 hover:text-red-600"><Trash2 size={16} /> <span className="hidden sm:inline">Clear Chat</span></button></div>
          <div className="flex-1 overflow-y-auto bg-slate-50/70 p-4 sm:p-6">{messages.length === 0 ? <WelcomeState onSuggestion={sendMessage} /> : <div className="space-y-5">{messages.map((message) => <ChatMessage key={message.id} message={message} />)}{thinking && <div className="flex items-end gap-3"><span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-indigo-100 text-indigo-700"><Bot size={18} /></span><div className="rounded-2xl rounded-bl-md bg-white px-4 py-3 text-sm text-slate-500 shadow-sm ring-1 ring-slate-100"><span className="inline-flex items-center gap-2"><Sparkles size={15} className="text-indigo-500" /> AI is thinking...</span></div></div>}<div ref={messagesEndRef} /></div>}</div>
          <div className="border-t border-slate-100 bg-white p-4"><div className="mb-3 flex gap-2 overflow-x-auto pb-1">{quickActions.map(({ label, text, icon: Icon }) => <button key={label} type="button" onClick={() => sendMessage(text)} disabled={thinking} className="inline-flex shrink-0 items-center gap-2 rounded-full border border-slate-200 px-3 py-2 text-xs font-bold text-slate-600 transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700 disabled:opacity-50"><Icon size={14} /> {label}</button>)}</div><div className="flex items-end gap-2 rounded-2xl border border-slate-200 bg-slate-50 p-2 transition focus-within:border-indigo-400 focus-within:bg-white focus-within:ring-4 focus-within:ring-indigo-50"><textarea value={input} onChange={(event) => setInput(event.target.value)} onKeyDown={handleKeyDown} disabled={thinking} rows={2} placeholder="Ask your doubt..." className="min-h-11 flex-1 resize-none bg-transparent px-2 py-2 text-sm text-slate-900 outline-none placeholder:text-slate-400 disabled:opacity-60" /><button type="button" onClick={() => sendMessage()} disabled={!input.trim() || thinking} aria-label="Send message" className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-indigo-600 text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-40"><Send size={17} /></button></div><p className="mt-2 px-2 text-[11px] text-slate-400">Press Enter to send · Shift + Enter for a new line</p></div>
        </section>

        <aside className="self-start rounded-2xl border border-slate-200 bg-white shadow-sm"><button type="button" onClick={() => setContextOpen((open) => !open)} className="flex w-full items-center justify-between p-5 text-left lg:cursor-default"><span className="flex items-center gap-2 font-bold text-slate-900"><PanelRight size={19} className="text-indigo-600" /> Learning Context</span><ChevronDown size={18} className={`text-slate-400 transition lg:hidden ${contextOpen ? 'rotate-180' : ''}`} /></button><div className={`${contextOpen ? 'block' : 'hidden'} border-t border-slate-100 p-5 lg:block`}><ContextItem label="Current Class" value="Class 10" /><ContextItem label="Current Subject" value="Science" /><ContextItem label="Current Chapter" value="Chemical Reactions and Equations" /><div className="mt-6 rounded-xl bg-indigo-50 p-4"><p className="text-sm leading-6 text-indigo-800">Ask questions related to your current chapter for better answers.</p></div></div></aside>
      </div>
    </div>
  )
}

function WelcomeState({ onSuggestion }) { return <div className="flex min-h-full flex-col items-center justify-center py-8 text-center"><span className="grid h-16 w-16 place-items-center rounded-2xl bg-indigo-100 text-3xl">👋</span><h2 className="mt-5 text-2xl font-bold text-slate-900">Hi! I&apos;m NCERT Buddy.</h2><p className="mt-2 max-w-md text-sm text-slate-500">I can help you understand NCERT concepts in simple language.</p><div className="mt-7 grid w-full max-w-xl gap-3 sm:grid-cols-2">{suggestions.map((suggestion) => <button key={suggestion} type="button" onClick={() => onSuggestion(suggestion)} className="rounded-xl border border-slate-200 bg-white p-3 text-left text-sm font-semibold text-slate-600 transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700">{suggestion}</button>)}</div></div> }
function ChatMessage({ message }) { const isStudent = message.role === 'student'; return <div className={`flex items-end gap-3 ${isStudent ? 'justify-end' : ''}`}>{!isStudent && <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-indigo-100 text-indigo-700"><Bot size={18} /></span>}<div className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-4 py-3 text-sm leading-6 shadow-sm ${isStudent ? 'rounded-br-md bg-indigo-600 text-white' : 'rounded-bl-md bg-white text-slate-700 ring-1 ring-slate-100'}`}>{message.text}</div>{isStudent && <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-emerald-100 text-emerald-700"><UserRound size={18} /></span>}</div> }
function ContextItem({ label, value }) { return <div className="border-b border-slate-100 py-4 first:pt-0 last:border-0"><p className="text-xs font-semibold uppercase tracking-wider text-slate-400">{label}</p><p className="mt-1 text-sm font-bold text-slate-800">{value}</p></div> }
function getMockResponse(message) { const normalized = message.toLowerCase(); if (normalized.includes('oxidation')) return 'Oxidation is a chemical process in which a substance gains oxygen, loses hydrogen, or loses electrons. For example, iron reacting with oxygen to form rust.'; if (normalized.includes('chemical reaction') || normalized.includes('chemical reactions')) return 'A chemical reaction is a process in which one or more substances change to form new substances. You may notice a colour change, gas formation, temperature change, or a new solid.'; return "I'm currently a demo AI tutor. Once the AI backend is connected, I'll be able to answer NCERT questions in detail." }

export default Chatbot
