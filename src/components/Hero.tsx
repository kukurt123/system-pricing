import { useEffect, useRef } from 'react'
import { applications } from '../data/applications'
import { formatPrice } from '../utils/pricing'

const img = (name: string) => `${import.meta.env.BASE_URL}illustrations/${name}`

const IconSliders = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    width="18"
    height="18"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    focusable="false"
  >
    <line x1="4" x2="4" y1="21" y2="14" />
    <line x1="4" x2="4" y1="10" y2="3" />
    <line x1="12" x2="12" y1="21" y2="12" />
    <line x1="12" x2="12" y1="8" y2="3" />
    <line x1="20" x2="20" y1="21" y2="16" />
    <line x1="20" x2="20" y1="12" y2="3" />
    <line x1="2" x2="6" y1="14" y2="14" />
    <line x1="10" x2="14" y1="8" y2="8" />
    <line x1="18" x2="22" y1="16" y2="16" />
  </svg>
)

const IconMonitor = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    width="18"
    height="18"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    focusable="false"
  >
    <rect width="20" height="14" x="2" y="3" rx="2" />
    <line x1="8" x2="16" y1="21" y2="21" />
    <line x1="12" x2="12" y1="17" y2="21" />
  </svg>
)

const IconWifiOff = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    width="18"
    height="18"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    focusable="false"
  >
    <path d="M5 12.55a11 11 0 0 1 14 0" />
    <path d="M8.5 16.28a6 6 0 0 1 7 0" />
    <circle cx="12" cy="20" r="1" fill="currentColor" stroke="none" />
    <line x1="4" y1="4" x2="20" y2="20" />
  </svg>
)

const IconShieldCheck = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    width="18"
    height="18"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    focusable="false"
  >
    <path d="M20 13c0 5-4 9-8 9s-8-4-8-9V5l8-3 8 3z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
)

const coreSystem =
  applications.find((app) => app.id === 'pms')?.features.find((feature) => feature.id === 'core-system') ?? null

const coreSystemPrice = coreSystem?.price ?? 0
const coreSystemName = coreSystem?.name ?? 'Core system'

const Hero = () => {
  const heroRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const element = heroRef.current
    if (!element) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    let rafId = 0

    const update = () => {
      rafId = 0
      const rect = element.getBoundingClientRect()
      const progressRaw = -rect.top / (rect.height + 220)
      const progress = Math.min(1, Math.max(0, progressRaw))
      element.style.setProperty('--hero-scroll', progress.toFixed(4))
    }

    const scheduleUpdate = () => {
      if (rafId) return
      rafId = window.requestAnimationFrame(update)
    }

    scheduleUpdate()
    window.addEventListener('scroll', scheduleUpdate, { passive: true })
    window.addEventListener('resize', scheduleUpdate)

    return () => {
      window.removeEventListener('scroll', scheduleUpdate)
      window.removeEventListener('resize', scheduleUpdate)
      if (rafId) window.cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <header className="hero" ref={heroRef}>
      <div className="hero-headline">
        <div className="hero-copy">
          <h1>Patient Management System Pricing</h1>
          <h2 className="hero-lead">Make every visit smoother.</h2>
          <div>
            <div className="eyebrow">
              <span className="icon windows"></span>
            </div>
            <div className="space-2"></div>
            <div className="eyebrow">
              <span className="icon mac"></span>
            </div>
          </div>
          <div className="block"></div>
          <div className="hero-notes" aria-label="Good to know">
            <div className="hero-note">
              <IconWifiOff className="hero-note-icon" />
              No internet needed
            </div>
            <div className="hero-note">
              <IconMonitor className="hero-note-icon" />
              Works on Windows &amp; Mac
            </div>
            <div className="hero-note">
              <IconShieldCheck className="hero-note-icon" />
              Data safety (backup &amp; restore)
            </div>
            <div className="hero-note">
              <IconSliders className="hero-note-icon" />
              Customizable and expandable
            </div>
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-art-wrap">
            <img className="hero-art" src={img('clinic-hero.svg')} alt="" decoding="async" />
            <div className="hero-art-badge">
              <div className="hero-art-badge-kicker">Basic package</div>
              <div className="hero-art-badge-price">{formatPrice(coreSystemPrice)}</div>
              <div className="hero-art-badge-sub">{coreSystemName}</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Hero
