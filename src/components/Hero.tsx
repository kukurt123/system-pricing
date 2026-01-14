import { useEffect, useRef } from 'react'

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
      <div className="eyebrow">Patient Management System</div>
      <div className="hero-headline">
        <div className="hero-decor" aria-hidden="true">
          <div className="hero-orb hero-orb-one" />
          <div className="hero-orb hero-orb-two" />
          <div className="hero-wave-wrap">
            <svg className="hero-wave" viewBox="0 0 1200 120" preserveAspectRatio="none">
              <defs>
                <linearGradient id="heroWaveGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="rgba(14, 165, 233, 0.28)" />
                  <stop offset="50%" stopColor="rgba(99, 102, 241, 0.22)" />
                  <stop offset="100%" stopColor="rgba(34, 197, 94, 0.18)" />
                </linearGradient>
              </defs>
              <path
                d="M0,52 C120,84 260,18 400,46 C540,74 680,104 820,82 C960,60 1080,10 1200,40 L1200,120 L0,120 Z"
                fill="url(#heroWaveGradient)"
                opacity="0.95"
              />
              <path
                d="M0,72 C140,102 300,44 440,62 C580,80 720,110 860,90 C1000,70 1100,30 1200,54 L1200,120 L0,120 Z"
                fill="rgba(99, 102, 241, 0.14)"
                opacity="0.9"
              />
            </svg>
          </div>
        </div>

        <div className="hero-content">
          <h1>Choose only what your clinic needs.</h1>
          <p>Select features individually. See your total instantly in PHP.</p>
          <p className="hero-note">
            Fully customizable • Software only (hardware not included) • Backup &amp; restore available
          </p>
        </div>
      </div>
    </header>
  )
}

export default Hero
