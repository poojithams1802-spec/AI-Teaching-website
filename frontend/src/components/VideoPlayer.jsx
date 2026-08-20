import { Play } from 'lucide-react'

function VideoPlayer({ videoUrl, title }) {
  if (!videoUrl) {
    return <div className="flex aspect-video items-center justify-center rounded-2xl bg-slate-100 text-center text-slate-500"><div><Play size={30} className="mx-auto mb-3 text-emerald-600" /><p className="font-semibold">Video coming soon</p></div></div>
  }

  return <div className="aspect-video overflow-hidden rounded-2xl bg-slate-950"><iframe className="h-full w-full" src={videoUrl} title={title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen /></div>
}

export default VideoPlayer
