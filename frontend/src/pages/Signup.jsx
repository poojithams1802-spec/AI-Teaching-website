import { useState } from 'react'
import { Eye, EyeOff, GraduationCap, LockKeyhole, Mail, UserRound } from 'lucide-react'
import { Link } from 'react-router-dom'

function Signup() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [message, setMessage] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    setMessage('Demo mode: your account form is ready to connect.')
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 px-4 py-10 text-left sm:px-6">
      <section className="w-full max-w-2xl rounded-3xl bg-white p-6 shadow-xl shadow-slate-200/70 sm:p-10 lg:p-12">
        <div className="mb-8 flex items-center justify-between gap-4"><Logo /><span className="hidden rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 sm:inline">Student account</span></div>
        <div className="mb-8"><h1 className="mb-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Create Your Account</h1><p className="text-slate-500">Start your NCERT learning journey.</p></div>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <Field label="Full name" type="text" placeholder="Your full name" icon={UserRound} required />
          <Field label="Email address" type="email" placeholder="you@example.com" icon={Mail} required />
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Password" type={showPassword ? 'text' : 'password'} placeholder="Create a password" icon={LockKeyhole} required trailing={<PasswordButton visible={showPassword} onClick={() => setShowPassword((visible) => !visible)} />} />
            <Field label="Confirm password" type={showConfirmation ? 'text' : 'password'} placeholder="Repeat your password" icon={LockKeyhole} required trailing={<PasswordButton visible={showConfirmation} onClick={() => setShowConfirmation((visible) => !visible)} />} />
          </div>
          <label className="block"><span className="mb-2 block text-sm font-semibold text-slate-700">Your class</span><select required defaultValue="" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm text-slate-700 outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-50"><option value="" disabled>Select your class</option><option>Class 10</option><option>Class 11</option><option>Class 12</option></select></label>
          <label className="flex items-start gap-2 text-sm text-slate-600"><input type="checkbox" required className="mt-0.5 h-4 w-4 rounded border-slate-300 accent-emerald-600" /><span>I agree to the <button type="button" onClick={() => setMessage('Terms and conditions will be available soon.')} className="font-semibold text-emerald-700 hover:text-emerald-800">terms and conditions</button>.</span></label>
          <button type="submit" className="flex w-full items-center justify-center rounded-xl bg-emerald-600 px-4 py-3.5 font-semibold text-white shadow-lg shadow-emerald-600/20 transition hover:bg-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-100">Create Account</button>
          {message && <p role="status" className="rounded-lg bg-emerald-50 px-3 py-2 text-sm text-emerald-700">{message}</p>}
        </form>
        <p className="mt-8 text-center text-sm text-slate-500">Already have an account? <Link to="/login" className="font-semibold text-emerald-700 hover:text-emerald-800">Login</Link></p>
      </section>
    </main>
  )
}

function Logo() {
  return <div className="flex items-center gap-2 font-bold text-slate-900"><span className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-100 text-emerald-700"><GraduationCap size={23} /></span><span className="text-xl">NCERT <span className="text-emerald-600">Buddy</span></span></div>
}

function PasswordButton({ visible, onClick }) {
  return <button type="button" aria-label={visible ? 'Hide password' : 'Show password'} onClick={onClick} className="text-slate-400 transition hover:text-emerald-600">{visible ? <EyeOff size={19} /> : <Eye size={19} />}</button>
}

function Field({ label, icon: Icon, trailing, ...props }) {
  return <label className="block"><span className="mb-2 block text-sm font-semibold text-slate-700">{label}</span><span className="flex items-center rounded-xl border border-slate-200 bg-slate-50 px-3 transition focus-within:border-emerald-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-emerald-50"><Icon size={18} className="shrink-0 text-slate-400" /><input {...props} className="min-w-0 flex-1 bg-transparent px-3 py-3 text-sm text-slate-900 outline-none placeholder:text-slate-400" />{trailing}</span></label>
}

export default Signup