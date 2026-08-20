import { LoaderCircle } from 'lucide-react'

function LoadingSpinner({ label = 'Loading...' }) {
  return (
    <div className="flex min-h-32 items-center justify-center" role="status" aria-live="polite">
      <div className="flex items-center gap-2 text-sm font-semibold text-slate-500">
        <LoaderCircle size={20} className="animate-spin text-emerald-600" aria-hidden="true" />
        <span>{label}</span>
      </div>
    </div>
  )
}

export default LoadingSpinner
