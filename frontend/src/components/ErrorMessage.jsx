import { AlertCircle, RefreshCw } from 'lucide-react'

function ErrorMessage({ message = 'Something went wrong. Please try again.', onRetry }) {
  return (
    <div className="flex min-h-32 items-center justify-center p-4" role="alert">
      <div className="flex max-w-md flex-col items-center gap-3 text-center">
        <AlertCircle size={24} className="text-red-500" aria-hidden="true" />
        <p className="text-sm font-semibold text-slate-700">{message}</p>
        {onRetry && (
          <button type="button" onClick={onRetry} className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-emerald-700">
            <RefreshCw size={16} aria-hidden="true" />
            Retry
          </button>
        )}
      </div>
    </div>
  )
}

export default ErrorMessage
