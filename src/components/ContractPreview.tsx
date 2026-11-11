import { useState } from 'react'
import { contractDraft, getContractEffectiveDate } from '../data/contract'
import type { Application, Selections } from '../types'
import { formatPrice } from '../utils/pricing'

type Props = {
  apps: Application[]
  selections: Selections
  overallTotal: number
}

type SelectedApp = Application & {
  enabledFeatures: Application['features']
}

type PaymentMode = 'full' | 'downpayment' | 'unpaid'

type ContractDocumentProps = {
  discountAmount: number
  finalTotal: number
  clientName: string
  overallTotal: number
  paymentMode: PaymentMode
  downpaymentAmount: number
  selectedApps: SelectedApp[]
  singleAppLabel: string | null
  className?: string
}

const buildPaymentTerms = (finalTotal: number, paymentMode: PaymentMode, downpaymentAmount: number) => {
  if (paymentMode === 'full') {
    return [
      `The total contract amount of ${formatPrice(finalTotal)} is due ${contractDraft.paymentDueOnSigning} and is treated as fully paid under this agreement.`,
      contractDraft.unpaidBalanceClause,
    ]
  }

  if (paymentMode === 'downpayment') {
    const balance = Math.max(finalTotal - downpaymentAmount, 0)

    return [
      `The Client shall pay a downpayment of ${formatPrice(downpaymentAmount)} ${contractDraft.paymentDueOnSigning}.`,
      `The remaining balance of ${formatPrice(balance)} is due ${contractDraft.paymentDueOnTurnover}.`,
      contractDraft.unpaidBalanceClause,
    ]
  }

  return [
    `The total contract amount of ${formatPrice(finalTotal)} is due ${contractDraft.paymentDueOnTurnover}.`,
    contractDraft.unpaidBalanceClause,
  ]
}

const ContractDocument = ({
  discountAmount,
  finalTotal,
  clientName,
  overallTotal,
  paymentMode,
  downpaymentAmount,
  selectedApps,
  singleAppLabel,
  className,
}: ContractDocumentProps) => {
  const paymentTerms = buildPaymentTerms(finalTotal, paymentMode, downpaymentAmount)
  const effectiveDate = getContractEffectiveDate()

  return (
    <article className={className}>
      <div className="contract-kicker">
        <span>{contractDraft.agreementCode}</span>
        <span>{effectiveDate}</span>
      </div>

      <h3 className="contract-paper-title">{contractDraft.agreementTitle}</h3>
      <p className="contract-paper-intro">
        This agreement is entered into by and between <strong>{contractDraft.providerName}</strong>, acting as{' '}
        {contractDraft.providerRole}, and <strong>{clientName}</strong>.
      </p>
      <p className="contract-paper-intro">{contractDraft.scopeSummary}</p>

      <div className="contract-party-grid">
        <div className="contract-party-card">
          <span className="contract-party-label">Provider</span>
          <strong>{contractDraft.providerName}</strong>
          <span>{contractDraft.providerRole}</span>
          <div className="contract-party-details" aria-label="Provider details">
            <span className="contract-party-detail">
              <strong>Address:</strong> {contractDraft.providerAddress}
            </span>
            <span className="contract-party-detail">
              <strong>Email:</strong> {contractDraft.providerEmail}
            </span>
            <span className="contract-party-detail">
              <strong>Driver&apos;s license no.:</strong> {contractDraft.providerLicenseNumber}
            </span>
          </div>
        </div>
        <div className="contract-party-card">
          <span className="contract-party-label">Client</span>
          <strong>{clientName}</strong>
        </div>
        <div className="contract-party-card">
          <span className="contract-party-label">Reinstallation fee</span>
          <strong>Variable rate</strong>
          <span>Based on the Provider&apos;s current service rate at the time of request</span>
        </div>
      </div>

      <section className="contract-block">
        <h4>1. Availed Features and Project Price</h4>
        {selectedApps.map((app) => (
          <div key={app.id} className="contract-feature-group">
            <div className="contract-feature-group-title">{singleAppLabel ?? app.name}</div>
            <div className="contract-feature-list">
              {app.enabledFeatures.map((feature) => (
                <div key={feature.id} className="contract-feature-row">
                  <div>
                    <strong>{feature.name}</strong>
                    <p>{feature.description}</p>
                    {feature.pricingNote ? <p>{feature.pricingNote}</p> : null}
                  </div>
                  <span>{formatPrice(feature.price)}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
        <div className="contract-total-row">
          <span>Subtotal contract amount</span>
          <strong>{formatPrice(overallTotal)}</strong>
        </div>
        {discountAmount > 0 ? (
          <>
            <div className="contract-total-row contract-discount-row">
              <span>Discount</span>
              <strong>-{formatPrice(discountAmount)}</strong>
            </div>
            <div className="contract-total-row contract-final-row">
              <span>Final contract amount</span>
              <strong>{formatPrice(finalTotal)}</strong>
            </div>
          </>
        ) : null}
      </section>

      <section className="contract-block">
        <h4>2. Lifetime Support</h4>
        <div className="contract-list">
          {contractDraft.supportItems.map((item) => (
            <p key={item}>{item}</p>
          ))}
        </div>
      </section>

      <section className="contract-block">
        <h4>3. Support Scope Limitations</h4>
        <div className="contract-list">
          {contractDraft.supportLimitations.map((item) => (
            <p key={item}>{item}</p>
          ))}
        </div>
      </section>

      <section className="contract-block">
        <h4>4. Payment Terms</h4>
        <div className="contract-list">
          {paymentTerms.map((item) => (
            <p key={item}>{item}</p>
          ))}
        </div>
      </section>

      <section className="contract-block">
        <h4>5. Project Cancellation or Pause</h4>
        <p>{contractDraft.cancellationClause}</p>
      </section>

      <section className="contract-block">
        <h4>6. Data Security and Confidentiality</h4>
        <p>{contractDraft.dataSecurityClause}</p>
      </section>

      <section className="contract-block">
        <h4>7. Successor Support Continuity</h4>
        <p>{contractDraft.successorClause}</p>
      </section>

      <section className="contract-block">
        <h4>8. Reinstallation and Device Recovery</h4>
        <p>{contractDraft.reinstallationClause}</p>
        <p>{contractDraft.reinstallationNotice}</p>
      </section>

      <section className="contract-signatures" aria-label="Signature lines">
        <div className="contract-signature-card">
          <span className="contract-party-label">Provider signature</span>
          <div className="contract-signature-line" />
          <strong>{contractDraft.providerName}</strong>
          <span>{contractDraft.providerRole}</span>
        </div>
        <div className="contract-signature-card">
          <span className="contract-party-label">Client signature</span>
          <div className="contract-signature-line" />
          <div className="contract-signature-meta">
            <span className="contract-signature-meta-label">Printed name</span>
            <div className="contract-signature-fill" />
          </div>
          <div className="contract-signature-meta">
            <span className="contract-signature-meta-label">Client name</span>
            <div className="contract-signature-fill" />
          </div>
        </div>
      </section>
    </article>
  )
}

const ContractPreview = ({ apps, selections, overallTotal }: Props) => {
  const showPrintButton = import.meta.env.DEV
  const [clientName, setClientName] = useState<string>(contractDraft.clientName)
  const [discountInput, setDiscountInput] = useState<string>('')
  const [paymentMode, setPaymentMode] = useState<PaymentMode>('unpaid')
  const [downpaymentInput, setDownpaymentInput] = useState<string>('')
  const singleAppLabel = apps.length === 1 ? 'Patient Management System Modules' : null
  const selectedApps = apps
    .map((app) => ({
      ...app,
      enabledFeatures: app.features.filter((feature) => feature.required || (selections[app.id]?.[feature.id] ?? false)),
    }))
    .filter((app) => app.enabledFeatures.length > 0)
  const parsedDiscount = Number(discountInput)
  const discountAmount =
    discountInput.trim() === '' || Number.isNaN(parsedDiscount) ? 0 : Math.min(Math.max(parsedDiscount, 0), overallTotal)
  const finalTotal = Math.max(overallTotal - discountAmount, 0)
  const parsedDownpayment = Number(downpaymentInput)
  const downpaymentAmount =
    paymentMode !== 'downpayment' || downpaymentInput.trim() === '' || Number.isNaN(parsedDownpayment)
      ? 0
      : Math.min(Math.max(parsedDownpayment, 0), finalTotal)

  return (
    <section className="contract-section" id="contract" aria-labelledby="contract-title">
      <div className="contract-section-header">
        <div>
          <div className="badge">Client contract</div>
          <h2 id="contract-title" className="contract-section-title">
            Ready-to-print service agreement
          </h2>
          <p className="contract-section-copy">
            This draft mirrors the availed system features and adds the payment, support, successor, and
            reinstallation terms your client asked for.
          </p>
          <p className="contract-section-note">
            The printed feature list always follows your current selections. Print output generates one contract copy.
          </p>
        </div>
        {showPrintButton ? (
          <button className="primary contract-print-button" type="button" onClick={() => window.print()}>
            Print contract
          </button>
        ) : null}
      </div>

      {showPrintButton ? (
        <div className="contract-inputs">
          <div className="contract-input-grid">
            <label className="contract-input-group">
              <span className="contract-input-label">Client name before print</span>
              <input
                className="contract-input"
                type="text"
                value={clientName}
                onChange={(event) => setClientName(event.target.value)}
                placeholder="Enter client name"
              />
            </label>
            <label className="contract-input-group">
              <span className="contract-input-label">Discount amount</span>
              <input
                className="contract-input"
                type="number"
                min="0"
                step="1"
                inputMode="decimal"
                value={discountInput}
                onChange={(event) => setDiscountInput(event.target.value)}
                placeholder="Optional discount"
              />
            </label>
            <label className="contract-input-group">
              <span className="contract-input-label">Payment arrangement</span>
              <select
                className="contract-input"
                value={paymentMode}
                onChange={(event) => setPaymentMode(event.target.value as PaymentMode)}
              >
                <option value="unpaid">Payment due on turnover</option>
                <option value="downpayment">With downpayment</option>
                <option value="full">Fully paid upon signing</option>
              </select>
            </label>
            {paymentMode === 'downpayment' ? (
              <label className="contract-input-group">
                <span className="contract-input-label">Downpayment amount</span>
                <input
                  className="contract-input"
                  type="number"
                  min="0"
                  step="1"
                  inputMode="decimal"
                  value={downpaymentInput}
                  onChange={(event) => setDownpaymentInput(event.target.value)}
                  placeholder="Enter downpayment"
                />
                <span className="contract-input-hint">
                  Remaining balance: {formatPrice(Math.max(finalTotal - downpaymentAmount, 0))}
                </span>
              </label>
            ) : null}
          </div>
        </div>
      ) : null}

      <div className="contract-screen-only">
        <ContractDocument
          className="contract-paper"
          clientName={clientName}
          discountAmount={discountAmount}
          finalTotal={finalTotal}
          downpaymentAmount={downpaymentAmount}
          overallTotal={overallTotal}
          paymentMode={paymentMode}
          selectedApps={selectedApps}
          singleAppLabel={singleAppLabel}
        />
      </div>

      <div className="contract-print-sheet contract-print-only" aria-hidden="true">
        <ContractDocument
          className="contract-paper contract-paper-print"
          clientName={clientName}
          discountAmount={discountAmount}
          finalTotal={finalTotal}
          downpaymentAmount={downpaymentAmount}
          overallTotal={overallTotal}
          paymentMode={paymentMode}
          selectedApps={selectedApps}
          singleAppLabel={singleAppLabel}
        />
      </div>
    </section>
  )
}

export default ContractPreview
