import type { FC } from 'react'
import { formatPrice } from '../utils/pricing'

type Props = {
  overallTotal: number
  onRequest: () => void
  onQuestions: () => void
  facebookUrl: string
}

const TotalBar: FC<Props> = ({ overallTotal, onRequest, onQuestions, facebookUrl }) => (
  <footer className="total-bar">
    <div className="total-left" role="status" aria-live="polite">
      <span className="total-label">Total</span>
      <span className="total-amount">
        <span key={overallTotal} className="price-pop">
          {formatPrice(overallTotal)}
        </span>
      </span>
    </div>
    <div className="total-actions">
      <button className="primary" onClick={onRequest}>
        <span className="button-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none">
            <path
              d="M7 3.75h7.5L19.25 8.5V20.25a.75.75 0 0 1-.75.75H7a.75.75 0 0 1-.75-.75V4.5c0-.414.336-.75.75-.75Z"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinejoin="round"
            />
            <path
              d="M14.5 3.75V8.5h4.75"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinejoin="round"
            />
            <path
              d="M9 12.25h7.5M9 15.5h7.5M9 18.75h5.5"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
        </span>
        Get a quote
      </button>
      <button className="ghost-button" onClick={onQuestions}>
        <span className="button-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none">
            <path
              d="M7.5 18.25 4.75 20.5V6.75c0-.966.784-1.75 1.75-1.75h11c.966 0 1.75.784 1.75 1.75v8.5c0 .966-.784 1.75-1.75 1.75h-10Z"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinejoin="round"
            />
            <path
              d="M8.75 9.25h6.5M8.75 12.25h6.5"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
        </span>
        Ask a question
      </button>
      <a
        className="ghost-button facebook-button"
        href={facebookUrl}
        target="_blank"
        rel="noreferrer"
        aria-label="Contact us on Facebook"
      >
        <span className="button-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none">
            <path
              d="M14.5 8.5h2V5.25h-2c-1.933 0-3.5 1.567-3.5 3.5v2H8v3.25h3v6h3.25v-6h2.75l.75-3.25h-3.5v-2c0-.414.336-.75.75-.75Z"
              fill="currentColor"
            />
          </svg>
        </span>
        Facebook
      </a>
      {/* <button className="ghost-button" onClick={onReset}>
        Reset selection
      </button> */}
    </div>
  </footer>
)

export default TotalBar
