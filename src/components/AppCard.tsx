import FeatureVideo from './FeatureVideo'
import { useState, type FC } from 'react'
import { packages, type PackageId } from '../data/packages'
import type { Application, Selections } from '../types'
import { formatPrice, isFeatureEnabled, type AppQuote } from '../utils/pricing'

type Props = {
  app: Application
  selections: Selections
  quote: AppQuote
  onSelectPremium: () => void
  onSelectStandard: () => void
  onClearAll: () => void
  onToggle: (featureId: string, enabled: boolean) => void
}

const IconCheck = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="3.2"
    strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
    <path d="m5 12.5 4.5 4.5L19 7.5" />
  </svg>
)

const IconSpark = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true" focusable="false">
    <path d="M12 2.5l2.2 6.1 6.3 2.2-6.3 2.2L12 19.1l-2.2-6.1-6.3-2.2 6.3-2.2z" />
  </svg>
)

const plural = (count: number, word: string) => `${count} ${word}${count === 1 ? '' : 's'}`

const AppCard: FC<Props> = ({ app, selections, quote, onSelectPremium, onSelectStandard, onClearAll, onToggle }) => {
  const [expandedFeatures, setExpandedFeatures] = useState<Record<string, boolean>>({})
  const appSelection = selections[app.id]

  const selectedCount = app.features.reduce(
    (count, feature) => (isFeatureEnabled(feature, appSelection) ? count + 1 : count),
    0,
  )

  const packageFeatures = app.features.filter((feature) => !feature.addon)
  const applied = quote.appliedPackage
  const appliedOffer = applied ? quote.offers[applied] : null

  const packageCards: { id: PackageId; onSelect: () => void }[] = [
    { id: 'standard', onSelect: onSelectStandard },
    { id: 'premium', onSelect: onSelectPremium },
  ]

  const groups = [
    { id: 'base', title: null, note: null, features: app.features.filter((feature) => feature.required) },
    {
      id: 'recommended',
      title: 'Essentials',
      note: 'In Standard and Premium.',
      features: packageFeatures.filter((feature) => !feature.required && feature.recommended),
    },
    {
      id: 'additional',
      title: 'More features',
      note: 'In Premium.',
      features: packageFeatures.filter((feature) => !feature.required && !feature.recommended),
    },
    {
      id: 'addons',
      title: 'Add-ons',
      note: 'Optional. Full price.',
      features: app.features.filter((feature) => feature.addon),
    },
  ].filter((group) => group.features.length)

  return (
    <article className="app-card">
      <header className="app-header">
        <div>
          <div className="badge">Custom quote</div>
          <p className="tagline">{app.tagline}</p>
        </div>
        <div className="app-meta">
          <div className="app-meta-count">
            {selectedCount} of {app.features.length} included
          </div>
          <div className="app-meta-actions">
            <button className="link-button" onClick={onClearAll}>
              Clear
            </button>
          </div>
        </div>
      </header>

      <div className="package-intro">
        <h3 className="package-intro-title">Pick a package and save</h3>
        <p className="package-intro-note">
          Or pick features below. Package discounts apply automatically.
        </p>
      </div>

      <div className="package-options" role="group" aria-label="Package options">
        {packageCards.map(({ id, onSelect }) => {
          const definition = packages[id]
          const offer = quote.offers[id]
          const isActive = applied === id
          const status = isActive ? 'Selected' : 'Choose'
          return (
            <button
              key={id}
              type="button"
              className={`package-option is-${id} ${isActive ? 'is-active' : ''}`}
              aria-pressed={isActive}
              onClick={onSelect}
            >
              {definition.ribbon ? <span className="package-ribbon">{definition.ribbon}</span> : null}
              <span className="package-head">
                <span className="package-radio" aria-hidden="true">
                  {isActive ? <IconCheck /> : null}
                </span>
                <span className="package-name">{definition.name}</span>
              </span>
              <span className="package-summary">
                {definition.summary} · {plural(offer.features.length, 'feature')}
              </span>
              <span className="package-pricing">
                <span className="package-price">{formatPrice(offer.bundlePrice)}</span>
                {offer.savings > 0 ? <s className="package-list-price">{formatPrice(offer.listPrice)}</s> : null}
              </span>
              {offer.savings > 0 ? (
                <span className="package-save">Save {formatPrice(offer.savings)}</span>
              ) : null}
              <span className="package-status">{status}</span>
            </button>
          )
        })}
      </div>

      {appliedOffer ? (
        <div key={applied} className={`package-applied is-${applied}`} role="status" aria-live="polite">
          <IconSpark className="package-applied-icon" />
          <div className="package-applied-copy">
            <strong>
              {packages[appliedOffer.id].name} applied. You save {formatPrice(appliedOffer.savings)}.
            </strong>
          </div>
        </div>
      ) : null}

      {groups.map((group) => (
        <section className="feature-group" key={group.id} aria-label={group.title ?? 'Base package'}>
          {group.title ? <h3 className="feature-group-title">{group.title}</h3> : null}
          {group.note ? <p className="feature-group-note">{group.note}</p> : null}
          <div className="feature-list" role="list">
            {group.features.map((feature) => {
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
                  className={`feature-item ${enabled ? 'is-on' : 'is-off'} ${isFeatured ? 'is-featured' : ''}`}
                >
                  <div className="feature-icon" aria-hidden="true">
                    {feature.image ? <img src={feature.image} alt="" loading="lazy" decoding="async" /> : null}
                  </div>
                  <div className="feature-content">
                    <div className="feature-row">
                      <div className="feature-title">
                        <span className="feature-title-text">{feature.name}</span>
                        {appliedOffer && !isFeatured && appliedOffer.features.includes(feature) ? (
                          <span className={`feature-tag is-bundle is-${appliedOffer.id}`}>In {packages[appliedOffer.id].name}</span>
                        ) : null}
                        {isFeatured ? <span className="feature-tag">Included</span> : null}
                      </div>
                      <div className="feature-actions">
                        {feature.video ? <FeatureVideo name={feature.name} video={feature.video} /> : null}
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
                            aria-label={`Include ${feature.name}`}
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
                      {feature.pricingNote ? <p className="feature-description">{feature.pricingNote}</p> : null}
                      {feature.localModels ? (
                        <table className="local-models" aria-label="AI options">
                          <thead><tr><th>Option</th><th>Includes</th><th>RAM</th></tr></thead>
                          <tbody>{feature.localModels.map(option => (
                            <tr key={option.name} className={option.recommended ? 'is-recommended' : undefined}>
                              <th scope="row">{option.name}{option.recommended ? <span className="ai-option-recommendation">Recommended</span> : null}</th>
                              <td>{option.capability}</td>
                              <td>{option.memory}</td>
                            </tr>
                          ))}</tbody>
                        </table>
                      ) : null}
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
        </section>
      ))}
    </article>
  )
}

export default AppCard
