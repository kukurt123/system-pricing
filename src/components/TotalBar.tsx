import { formatPrice } from '../utils/pricing'

type Props = {
  overallTotal: number
  onRequest: () => void
  onQuestions: () => void
  onDemo: () => void
  facebookUrl: string
}

const IconHelp = ({ className }: { className?: string }) => (
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
    <circle cx="12" cy="12" r="10" />
    <path d="M9.09 9a3 3 0 0 1 5.82 1c0 2-3 2-3 4" />
    <path d="M12 17h.01" />
  </svg>
)

const IconPlayCircle = ({ className }: { className?: string }) => (
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
    <circle cx="12" cy="12" r="10" />
    <path d="M10 8l6 4-6 4V8z" fill="currentColor" stroke="none" />
  </svg>
)

const IconFacebook = ({ className }: { className?: string }) => (
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
    <circle cx="12" cy="12" r="10" />
    <path d="M15 8h-2a3 3 0 0 0-3 3v2H8v3h2v4h3v-4h2.5l.5-3H13v-2a1 1 0 0 1 1-1h2V8z" />
  </svg>
)

const TotalBar = ({ overallTotal, onRequest, onQuestions, onDemo, facebookUrl }: Props) => {
  return (
    <footer className="total-bar">
      <div className="total-actions">
        <button className="primary" onClick={onRequest}>
          Get a quote
        </button>
        <button className="ghost-button" type="button" onClick={onQuestions}>
          <IconHelp className="button-icon" />
          Ask a question
        </button>
        <button className="ghost-button" type="button" onClick={onDemo}>
          <IconPlayCircle className="button-icon" />
          Request Online Demo
        </button>
        <button
          className="ghost-button"
          type="button"
          onClick={() => window.open(facebookUrl, "_blank", "noopener,noreferrer")}
        >
          <IconFacebook className="button-icon facebook" />
          Facebook
        </button>
      </div>
      <div className="total-left" role="status" aria-live="polite">
        <span className="total-label">Total</span>
        <span className="total-amount">
          <span key={overallTotal} className="price-pop">
            {formatPrice(overallTotal)}
          </span>
        </span>
      </div>
    </footer>
  )
}

export default TotalBar
