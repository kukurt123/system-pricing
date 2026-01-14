import type { Application, Selections } from '../types'
import { formatPrice } from './pricing'

const DEFAULT_RECIPIENT = 'sales@yourcompany.com'

export const buildQuoteMailto = (
  apps: Application[],
  selections: Selections,
  overallTotal: number,
  recipient = DEFAULT_RECIPIENT,
) => {
  const lines: string[] = []

  apps.forEach((app) => {
    const enabled = app.features.filter((feature) => selections[app.id]?.[feature.id] ?? true)
    if (!enabled.length) return
    lines.push(`${app.name}:`)
    enabled.forEach((feature) => {
      lines.push(`- ${feature.name} (${formatPrice(feature.price)})`)
    })
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
    const enabled = app.features.filter((feature) => selections[app.id]?.[feature.id] ?? true)
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
