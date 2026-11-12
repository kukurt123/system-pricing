import { packages, type PackageId } from '../data/packages'
import type { Application, Feature } from '../types'

export const formatPrice = (value: number) =>
  value.toLocaleString('en-PH', { style: 'currency', currency: 'PHP', maximumFractionDigits: 0 })

export const isFeatureEnabled = (feature: Feature, selection: Record<string, boolean> | undefined) =>
  Boolean(feature.required || selection?.[feature.id])

export const getPackageFeatures = (app: Application, packageId: PackageId) =>
  app.features.filter((feature) =>
    packageId === 'premium' ? !feature.addon : !feature.addon && (feature.required || feature.recommended),
  )

const sumPrices = (features: Feature[]) => features.reduce((sum, feature) => sum + feature.price, 0)

export type PackageOffer = {
  id: PackageId
  features: Feature[]
  listPrice: number
  bundlePrice: number
  savings: number
  missing: Feature[]
}

export const getPackageOffer = (
  app: Application,
  packageId: PackageId,
  selection: Record<string, boolean> | undefined,
): PackageOffer => {
  const features = getPackageFeatures(app, packageId)
  const listPrice = sumPrices(features)
  const bundlePrice = Math.min(packages[packageId].bundlePrice, listPrice)
  return {
    id: packageId,
    features,
    listPrice,
    bundlePrice,
    savings: listPrice - bundlePrice,
    missing: features.filter((feature) => !isFeatureEnabled(feature, selection)),
  }
}

export type AppQuote = {
  subtotal: number
  discount: number
  total: number
  /** Package whose bundle price applies; null when the selection covers neither. */
  appliedPackage: PackageId | null
  offers: Record<PackageId, PackageOffer>
}

/**
 * A package applies whenever every one of its features is selected; extra features
 * stay at list price. The qualifying package with the larger saving wins.
 */
export const getAppQuote = (app: Application, selection: Record<string, boolean> | undefined): AppQuote => {
  const subtotal = sumPrices(app.features.filter((feature) => isFeatureEnabled(feature, selection)))
  const offers = {
    standard: getPackageOffer(app, 'standard', selection),
    premium: getPackageOffer(app, 'premium', selection),
  }
  const best =
    [offers.premium, offers.standard]
      .filter((offer) => offer.missing.length === 0)
      .sort((a, b) => b.savings - a.savings)[0] ?? null
  const discount = best?.savings ?? 0
  return {
    subtotal,
    discount,
    total: subtotal - discount,
    appliedPackage: best?.id ?? null,
    offers,
  }
}
