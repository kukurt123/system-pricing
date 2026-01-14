import type { FC } from 'react'
import type { Application, Selections } from '../types'
import { formatPrice } from '../utils/pricing'

type Props = {
  app: Application
  selections: Selections
  onSelectAll: () => void
  onClearAll: () => void
  onToggle: (featureId: string, enabled: boolean) => void
}

const AppCard: FC<Props> = ({ app, selections, onSelectAll, onClearAll, onToggle }) => {
  const selectedCount = app.features.reduce((count, feature) => {
    const enabled = selections[app.id]?.[feature.id] ?? true
    return enabled ? count + 1 : count
  }, 0)

  return (
    <article className="app-card">
      <header className="app-header">
        <div>
          <div className="badge">Pricing Builder</div>
          <h2>{app.name}</h2>
          <p className="tagline">{app.tagline}</p>
        </div>
        <div className="app-meta">
          <div className="app-meta-count">
            {selectedCount} / {app.features.length} selected
          </div>
          <div className="app-meta-actions">
            <button className="link-button" onClick={onSelectAll}>
              Include all
            </button>
            <span className="link-divider" aria-hidden="true" />
            <button className="link-button" onClick={onClearAll}>
              Clear
            </button>
          </div>
        </div>
      </header>

      <div className="feature-list" role="list">
        {app.features.map((feature, featureIndex) => {
          const enabled = selections[app.id]?.[feature.id] ?? true
          const highlights = feature.highlights?.length ? feature.highlights : [feature.description]
          const isFeatured = feature.id === 'core-system'
          return (
            <div
              key={feature.id}
              role="listitem"
              style={{ animationDelay: `${featureIndex * 55}ms` }}
              className={`feature-item ${enabled ? 'is-on' : 'is-off'} ${isFeatured ? 'is-featured' : ''}`}
            >
              <div className="feature-icon" aria-hidden="true">
                {feature.image ? <img src={feature.image} alt="" loading="lazy" decoding="async" /> : null}
              </div>
              <div className="feature-content">
                <div className="feature-row">
                  <div className="feature-title">
                    <span className="feature-title-text">{feature.name}</span>
                    {isFeatured ? <span className="feature-tag">Main package</span> : null}
                  </div>
                  <div className="feature-actions">
                    <div className="feature-price">{formatPrice(feature.price)}</div>
                    <label className="toggle">
                      <input
                        type="checkbox"
                        checked={enabled}
                        onChange={(event) => onToggle(feature.id, event.target.checked)}
                      />
                      <span className="slider" />
                    </label>
                  </div>
                </div>
                <details className="feature-details">
                  <summary className="feature-details-summary">
                    <span className="sr-only">Details</span>
                    <span className="details-chevron" aria-hidden="true" />
                  </summary>
                  <div className="feature-details-body">
                    <p className="feature-description">{feature.description}</p>
                    <ul className="feature-highlights">
                      {highlights.map((item, index) => (
                        <li key={`${feature.id}:${index}`}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </details>
              </div>
            </div>
          )
        })}
      </div>
      <div className="app-actions app-actions-mobile">
        <button className="ghost-button" onClick={onSelectAll}>
          Include all
        </button>
        <button className="ghost-button" onClick={onClearAll}>
          Remove all
        </button>
      </div>
    </article>
  )
}

export default AppCard
