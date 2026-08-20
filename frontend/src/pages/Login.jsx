import { useState } from 'react'
import { Eye, EyeOff, GraduationCap, LockKeyhole, Mail } from 'lucide-react'
import { Link } from 'react-router-dom'

function Login() {
  const [showPassword, setShowPassword] = useState(false)
  const [message, setMessage] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    setMessage('Demo mode: your login form is ready to connect.')
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 px-4 py-10 text-left sm:px-6">
      <section className="grid w-full max-w-5xl overflow-hidden rounded-3xl bg-white shadow-xl shadow-slate-200/70 md:grid-cols-[0.9fr_1.1fr]">
        <div className="relative hidden overflow-hidden bg-emerald-700 p-10 text-white md:flex md:flex-col md:justify-between">
          <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-emerald-500/40" />
          <div className="absolute -bottom-24 -left-12 h-64 w-64 rounded-full border-[32px] border-emerald-600/60" />
          <Logo light />
          <div className="relative">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-emerald-100">Learn with confidence</p>
            <h2 className="mb-4 text-4xl font-bold leading-tight text-white">Small steps today, big results tomorrow.</h2>
            <p className="max-w-sm text-emerald-50">Build strong foundations with focused NCERT lessons, practice, and progress tracking.</p>
          </div>
          <p className="relative text-sm text-emerald-100">Made for curious minds in Classes 10-12</p>
        </div>

        <div className="p-6 sm:p-10 lg:p-14">
          <div className="mb-8 md:hidden"><Logo /></div>
          <div className="mb-8">
            <h1 className="mb-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Welcome Back!</h1>
            <p className="text-slate-500">Continue your learning journey.</p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <Field label="Email address" type="email" placeholder="you@example.com" icon={Mail} required />
            <Field
              label="Password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password"
              icon={LockKeyhole}
              required
              trailing={
                <button type="button" aria-label={showPassword ? 'Hide password' : 'Show password'} onClick={() => setShowPassword((visible) => !visible)} className="text-slate-400 transition hover:text-emerald-600">
                  {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
                </button>
              }
            />
            <div className="flex items-center justify-between gap-4 text-sm">
              <label className="flex items-center gap-2 text-slate-600"><input type="checkbox" className="h-4 w-4 rounded border-slate-300 accent-emerald-600" /> Remember me</label>
              <button type="button" onClick={() => setMessage('Password recovery will be available soon.')} className="font-semibold text-emerald-700 hover:text-emerald-800">Forgot password?</button>
            </div>
            <button type="submit" className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-3.5 font-semibold text-white shadow-lg shadow-emerald-600/20 transition hover:bg-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-100">Log in</button>
            {message && <p role="status" className="rounded-lg bg-emerald-50 px-3 py-2 text-sm text-emerald-700">{message}</p>}
          </form>
          <p className="mt-8 text-center text-sm text-slate-500">Don&apos;t have an account? <Link to="/signup" className="font-semibold text-emerald-700 hover:text-emerald-800">Sign up</Link></p>
        </div>
      </section>
    </main>
  )
}

function Logo({ light = false }) {
  return <div className={`flex items-center gap-2 font-bold ${light ? 'text-white' : 'text-slate-900'}`}><span className={`grid h-10 w-10 place-items-center rounded-xl ${light ? 'bg-white/15' : 'bg-emerald-100 text-emerald-700'}`}><GraduationCap size={23} /></span><span className="text-xl">NCERT <span className={light ? 'text-emerald-100' : 'text-emerald-600'}>Buddy</span></span></div>
}

function Field({ label, icon: Icon, trailing, ...props }) {
  return <label className="block"><span className="mb-2 block text-sm font-semibold text-slate-700">{label}</span><span className="flex items-center rounded-xl border border-slate-200 bg-slate-50 px-3 transition focus-within:border-emerald-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-emerald-50"><Icon size={18} className="shrink-0 text-slate-400" /><input {...props} className="min-w-0 flex-1 bg-transparent px-3 py-3 text-sm text-slate-900 outline-none placeholder:text-slate-400" />{trailing}</span></label>
}

export default Login