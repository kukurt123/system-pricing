export type PackageId = 'standard' | 'premium'

export type PackageDefinition = {
  id: PackageId
  name: string
  summary: string
  /** Bundle price for the package features. Add-ons are always billed at list price. */
  bundlePrice: number
  ribbon?: string
}

/**
 * Standard = base package + every feature flagged `recommended`.
 * Premium  = every non-add-on feature.
 * The discount is the package's list price minus `bundlePrice`.
 */
export const packages: Record<PackageId, PackageDefinition> = {
  standard: {
    id: 'standard',
    name: 'Standard',
    summary: 'Base + essentials',
    bundlePrice: 43000,
    ribbon: 'Most popular',
  },
  premium: {
    id: 'premium',
    name: 'Premium',
    summary: 'Everything',
    // Placeholder pending final pricing; keep the discount above Standard's.
    bundlePrice: 65000,
    ribbon: 'Best value',
  },
}
