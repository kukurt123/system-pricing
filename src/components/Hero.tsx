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

const IconAlertTriangle = ({ className }: { className?: string }) => (
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
    <path d="M10.3 3.6 1.9 18a2 2 0 0 0 1.7 3h16.8a2 2 0 0 0 1.7-3L13.7 3.6a2 2 0 0 0-3.4 0z" />
    <path d="M12 9v4" />
    <path d="M12 17h.01" />
  </svg>
)

const IconLaptop = ({ className }: { className?: string }) => (
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
    <rect width="18" height="12" x="3" y="4" rx="2" />
    <path d="M2 20h20" />
  </svg>
)

const IconPhone = ({ className }: { className?: string }) => (
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
    <rect width="10" height="18" x="7" y="3" rx="2" />
    <path d="M11 18h2" />
  </svg>
)

const IconPrinter = ({ className }: { className?: string }) => (
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
    <path d="M6 9V2h12v7" />
    <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
    <path d="M6 14h12v8H6z" />
  </svg>
)

const IconDrive = ({ className }: { className?: string }) => (
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
    <rect width="18" height="14" x="3" y="5" rx="2" />
    <path d="M7 9h.01" />
    <path d="M11 9h.01" />
    <path d="M15 9h.01" />
  </svg>
)

const IconPower = ({ className }: { className?: string }) => (
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
    <path d="M12 2v10" />
    <path d="M18.36 6.64a9 9 0 1 1-12.72 0" />
  </svg>
)

const IconRouter = ({ className }: { className?: string }) => (
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
    <rect width="20" height="8" x="2" y="14" rx="2" />
    <path d="M6 18h.01" />
    <path d="M10 18h.01" />
    <path d="M14 18h.01" />
    <path d="M18 18h.01" />
    <path d="M7 10a7 7 0 0 1 10 0" />
    <path d="M9.5 12.5a3.5 3.5 0 0 1 5 0" />
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
              No internet needed • No monthly fees
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

      <section className="hardware-card" aria-label="Hardware checklist">
        <div className="hardware-card-header">
          <div className="hardware-card-title">
            <IconAlertTriangle className="hardware-card-title-icon" />
            Hardware not included
          </div>
        </div>
        <p className="hardware-card-note">To use the system, you’ll need these basic devices in your clinic.</p>
        <div className="hardware-chips" role="list">
          <div className="hardware-chip" role="listitem">
            <IconLaptop className="hardware-chip-icon" />
            Computer/Laptop
          </div>
          <div className="hardware-chip" role="listitem">
            <IconPhone className="hardware-chip-icon" />
            Hand devices
          </div>
          <div className="hardware-chip" role="listitem">
            <IconPrinter className="hardware-chip-icon" />
            Printer &amp; scanner
          </div>
          <a
            className="hardware-chip hardware-chip-link"
            role="listitem"
            href="https://www.google.com/search?tbm=isch&q=usb+external+drive"
            target="_blank"
            rel="noreferrer"
          >
            <IconDrive className="hardware-chip-icon" />
            USB/External drives
          </a>
          <a
            className="hardware-chip hardware-chip-link"
            role="listitem"
            href="https://www.google.com/search?tbm=isch&q=ups+uninterruptible+power+supply"
            target="_blank"
            rel="noreferrer"
          >
            <IconPower className="hardware-chip-icon" />
            UPS
          </a>
          <a
            className="hardware-chip hardware-chip-link"
            role="listitem"
            href="https://www.google.com/search?tbm=isch&q=wifi+router"
            target="_blank"
            rel="noreferrer"
          >
            <IconRouter className="hardware-chip-icon" />
            Router
          </a>
        </div>
      </section>
    </header>
  )
}

export default Hero
