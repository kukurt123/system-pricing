import { useState, type FC } from 'react'
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
  const [expandedFeatures, setExpandedFeatures] = useState<Record<string, boolean>>({})

  const selectedCount = app.features.reduce((count, feature) => {
    const enabled = feature.required ? true : (selections[app.id]?.[feature.id] ?? false)
    return enabled ? count + 1 : count
  }, 0)

  return (
    <article className="app-card">
      <header className="app-header">
        <div>
          <div className="badge">Custom quote</div>
          <h2></h2>
          <p className="tagline">{app.tagline}</p>
        </div>
        <div className="app-meta">
          <div className="app-meta-count">
            {selectedCount} of {app.features.length} included
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
          const isFeatured = feature.id === 'core-system'
          const isLocked = feature.required || isFeatured
          const enabled = isLocked ? true : (selections[app.id]?.[feature.id] ?? false)
          const highlights = feature.highlights?.length ? feature.highlights : [feature.description]
          const isExpanded = expandedFeatures[feature.id] ?? false
          const detailsId = `${app.id}-${feature.id}-details`
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
                    <button
                      type="button"
                      className="feature-details-toggle"
                      aria-expanded={isExpanded}
                      aria-controls={detailsId}
                      onClick={() =>
                        setExpandedFeatures((prev) => ({
                          ...prev,
                          [feature.id]: !isExpanded,
                        }))
                      }
                    >
                      <span className="sr-only">More</span>
                      <span className="details-chevron" aria-hidden="true" />
                    </button>
                    <div className="feature-price">{formatPrice(feature.price)}</div>
                    <label className={`toggle ${isLocked ? 'is-locked' : ''}`}>
                      <input
                        type="checkbox"
                        checked={enabled}
                        disabled={isLocked}
                        onChange={(event) => onToggle(feature.id, event.target.checked)}
                      />
                      <span className="slider" />
                    </label>
                  </div>
                </div>
                <div
                  id={detailsId}
                  className={`feature-details-panel ${isExpanded ? 'is-open' : ''}`}
                  hidden={!isExpanded}
                >
                  <p className="feature-description">{feature.description}</p>
                  <ul className="feature-highlights">
                    {highlights.map((item, index) => (
                      <li key={`${feature.id}:${index}`}>{item}</li>
                    ))}
                  </ul>
                </div>
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
