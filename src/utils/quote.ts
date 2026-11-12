import { packages } from '../data/packages'
import type { Application, Selections } from '../types'
import { formatPrice, type AppQuote } from './pricing'

const DEFAULT_RECIPIENT = 'kurtestacion@gmail.com'

export const buildQuoteMailto = (
  apps: Application[],
  selections: Selections,
  quotes: Record<string, AppQuote>,
  recipient = DEFAULT_RECIPIENT,
) => {
  const lines: string[] = []
  let overallTotal = 0

  apps.forEach((app) => {
    const quote = quotes[app.id]
    if (quote) overallTotal += quote.total
    const enabled = app.features.filter((feature) => feature.required || (selections[app.id]?.[feature.id] ?? false))
    if (!enabled.length) return
    lines.push(`${app.name}:`)
    if (quote?.appliedPackage) lines.push(`Package: ${packages[quote.appliedPackage].name}`)
    enabled.forEach((feature) => {
      lines.push(`- ${feature.name} (${formatPrice(feature.price)})` )
      if (feature.pricingNote) lines.push(`  ${feature.pricingNote}`)
    })
    if (quote?.discount) {
      lines.push(`Subtotal: ${formatPrice(quote.subtotal)}`)
      lines.push(`${packages[quote.appliedPackage ?? 'standard'].name} package discount: -${formatPrice(quote.discount)}`)
    }
    lines.push('')
  })

  const body = [
    'Hi team,',
    '',
    "I'd like a quote for these features:",
    '',
    ...lines,
    `Estimated total: ${formatPrice(overallTotal)}`,
    '',
    'Company:',
    'Name:',
    'Timeline:',
  ].join('\n')

  const subject = `Quote request - ${formatPrice(overallTotal)}`
  return `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}

export const buildQuestionMailto = (
  apps: Application[],
  selections: Selections,
  recipient = DEFAULT_RECIPIENT,
) => {
  const interestLines: string[] = []

  apps.forEach((app) => {
    const enabled = app.features.filter((feature) => feature.required || (selections[app.id]?.[feature.id] ?? false))
    if (!enabled.length) return
    enabled.forEach((feature) => interestLines.push(`- ${feature.name}`))
  })

  const bodyLines = ['Hi team,', '', 'I have a few questions about the Patient Management System.', '']

  if (interestLines.length) {
    bodyLines.push("I'm interested in:", ...interestLines, '')
  } else {
    bodyLines.push('I’m interested in learning more.', '')
  }

  bodyLines.push('My questions:', '-', '', 'Clinic / Company:', 'Name:', 'Contact number:')
  const body = bodyLines.join('\n')

  const subject = 'Questions - Patient Management System'
  return `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}

export const buildDemoMailto = (
  apps: Application[],
  selections: Selections,
  recipient = DEFAULT_RECIPIENT,
) => {
  const interestLines: string[] = []

  apps.forEach((app) => {
    const enabled = app.features.filter((feature) => feature.required || (selections[app.id]?.[feature.id] ?? false))
    if (!enabled.length) return
    enabled.forEach((feature) => interestLines.push(`- ${feature.name}`))
  })

  const bodyLines = ['Hi team,', '', 'I’d like to schedule a demo for the Patient Management System.', '']

  if (interestLines.length) {
    bodyLines.push("I'm interested in:", ...interestLines, '')
  } else {
    bodyLines.push('I’m interested in a quick overview demo.', '')
  }

  bodyLines.push('Preferred date/time:', '-', '', 'Clinic / Company:', 'Name:', 'Contact number:')
  const body = bodyLines.join('\n')

  const subject = 'Demo request - Patient Management System'
  return `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}
