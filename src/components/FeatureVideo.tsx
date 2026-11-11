import { useEffect, useRef, useState } from 'react'
import type { FeatureVideoSource } from '../types'

type Props = { name: string; video: FeatureVideoSource }

export default function FeatureVideo({ name, video }: Props) {
  const [open, setOpen] = useState(false)
  const [failed, setFailed] = useState(false)
  const dialog = useRef<HTMLDialogElement>(null)
  const trigger = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (open) dialog.current?.showModal()
    else dialog.current?.close()
  }, [open])

  const close = () => {
    setOpen(false)
    trigger.current?.focus()
  }

  return (
    <div className="feature-video">
      <button ref={trigger} type="button" className="feature-video-trigger" onClick={() => { setFailed(false); setOpen(true) }} aria-label={`Watch ${name} demo video (${video.durationLabel})`} title={`Watch demo (${video.durationLabel})`}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7z" /></svg>
      </button>
      <dialog ref={dialog} className="feature-video-dialog" aria-label={`${name} demo video`} onCancel={close} onClose={() => setOpen(false)} onClick={event => { if (event.target === event.currentTarget) close() }}>
        {open ? <div className="feature-video-content">
          <div className="feature-video-header"><h3>{name}</h3><button type="button" onClick={close} aria-label="Close video">Close</button></div>
          {video.youtubeId ? <iframe title={`${name} demonstration`} src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}?rel=0`} allow="fullscreen; picture-in-picture; encrypted-media" allowFullScreen referrerPolicy="strict-origin-when-cross-origin" /> :
            <video controls playsInline preload="metadata" poster={video.poster} onError={() => setFailed(true)}>
              <source src={video.src} type="video/mp4" />
              Your browser does not support embedded videos.
            </video>}
          {failed ? <p role="alert">Unable to load the video. <a href={video.src} target="_blank" rel="noopener noreferrer">Open the video directly</a>.</p> : null}
          <p>Actual Patient Management System interface with demonstration data. <a href={video.src} target="_blank" rel="noopener noreferrer">Open video directly</a></p>
        </div> : null}
      </dialog>
    </div>
  )
}
