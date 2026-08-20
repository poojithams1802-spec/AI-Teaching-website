import { Inbox } from 'lucide-react'

function EmptyState({ title = 'Nothing here yet', description = 'There is no content to display right now.', icon: Icon = Inbox }) {
  return (
    <div className="flex min-h-40 items-center justify-center p-6 text-center">
      <div className="flex max-w-md flex-col items-center">
        <span className="grid h-12 w-12 place-items-center rounded-xl bg-slate-100 text-slate-500">
          <Icon size={23} aria-hidden="true" />
        </span>
        <h2 className="mt-4 text-lg font-bold text-slate-900">{title}</h2>
        <p className="mt-1 text-sm leading-6 text-slate-500">{description}</p>
      </div>
    </div>
  )
}

export default EmptyState
