import { useEffect, useMemo, useState } from 'react'
import type { PackageId } from '../data/packages'
import type { Application, Selections } from '../types'
import { getAppQuote, type AppQuote } from '../utils/pricing'

const STORAGE_PREFIX = 'pricing-selections:v2:'

const getDefaultSelectionForApp = (app: Application) =>
  Object.fromEntries(app.features.map((feature) => [feature.id, feature.required ? true : false])) as Record<string, boolean>

const applyRequiredFeatures = (app: Application, selection: Record<string, boolean>) => {
  const normalized = { ...selection }
  app.features.forEach((feature) => {
    if (feature.required) normalized[feature.id] = true
  })
  return normalized
}

const buildDefaults = (apps: Application[]) =>
  Object.fromEntries(apps.map((app) => [app.id, getDefaultSelectionForApp(app)])) as Selections

const loadSelections = (apps: Application[]): Selections => {
  const defaults = buildDefaults(apps)

  if (typeof window === 'undefined') {
    return defaults
  }

  const merged: Selections = { ...defaults }

  apps.forEach((app) => {
    const stored = window.localStorage.getItem(`${STORAGE_PREFIX}${app.id}`)
    if (!stored) return

    try {
      const parsed = JSON.parse(stored) as Record<string, boolean>
      merged[app.id] = applyRequiredFeatures(app, { ...defaults[app.id], ...parsed })
    } catch (error) {
      console.error('Unable to read cached selections for', app.id, error)
    }
  })

  return merged
}

export const useSelections = (apps: Application[]) => {
  const [selections, setSelections] = useState<Selections>(() => loadSelections(apps))

  useEffect(() => {
    apps.forEach((app) => {
      const appSelections = selections[app.id] ?? getDefaultSelectionForApp(app)
      const normalizedSelections = applyRequiredFeatures(app, appSelections)
      try {
        window.localStorage.setItem(`${STORAGE_PREFIX}${app.id}`, JSON.stringify(normalizedSelections))
      } catch (error) {
        console.warn('Local storage is unavailable; selections will not persist.', error)
      }
    })
  }, [selections, apps])

  const updateFeature = (appId: string, featureId: string, enabled: boolean) => {
    setSelections((prev) => {
      const app = apps.find((item) => item.id === appId)
      if (!app) return prev
      const feature = app.features.find((item) => item.id === featureId)
      if (feature?.required) return prev
      const currentAppSelection = { ...getDefaultSelectionForApp(app), ...prev[appId] }
      const nextSelection = applyRequiredFeatures(app, { ...currentAppSelection, [featureId]: enabled })
      return {
        ...prev,
        [appId]: nextSelection,
      }
    })
  }

  const setAllForApp = (appId: string, enabled: boolean) => {
    const app = apps.find((item) => item.id === appId)
    if (!app) return

    const nextSelection = Object.fromEntries(
      app.features.map((feature) => [feature.id, feature.required ? true : enabled]),
    )
    setSelections((prev) => ({ ...prev, [appId]: nextSelection }))
  }

  const setPackageForApp = (appId: string, preset: PackageId) => {
    const app = apps.find((item) => item.id === appId)
    if (!app) return

    setSelections((prev) => ({
      ...prev,
      [appId]: Object.fromEntries(
        app.features.map((feature) => [
          feature.id,
          Boolean(feature.required || (feature.addon
            ? prev[appId]?.[feature.id]
            : preset === 'premium' || feature.recommended)),
        ]),
      ),
    }))
  }

  const resetAll = () => {
    const defaults = buildDefaults(apps)
    setSelections(defaults)
  }

  const appQuotes = useMemo(
    () =>
      Object.fromEntries(
        apps.map((app) => [
          app.id,
          getAppQuote(app, applyRequiredFeatures(app, selections[app.id] ?? getDefaultSelectionForApp(app))),
        ]),
      ) as Record<string, AppQuote>,
    [apps, selections],
  )

  const appTotals = useMemo(
    () => Object.fromEntries(Object.entries(appQuotes).map(([id, quote]) => [id, quote.total])) as Record<string, number>,
    [appQuotes],
  )

  const overallTotal = useMemo(() => Object.values(appTotals).reduce((sum, value) => sum + value, 0), [appTotals])
  const overallSubtotal = useMemo(
    () => Object.values(appQuotes).reduce((sum, quote) => sum + quote.subtotal, 0),
    [appQuotes],
  )
  const overallDiscount = overallSubtotal - overallTotal

  const totalFeatureCount = useMemo(
    () => apps.reduce((sum, app) => sum + app.features.length, 0),
    [apps],
  )

  const selectedFeatureCount = useMemo(
    () =>
      apps.reduce((sum, app) => {
        const selection = applyRequiredFeatures(app, selections[app.id] ?? getDefaultSelectionForApp(app))
        const selected = app.features.reduce(
          (count, feature) => (feature.required ? count + 1 : (selection[feature.id] ?? false ? count + 1 : count)),
          0,
        )
        return sum + selected
      }, 0),
    [apps, selections],
  )

  return {
    selections,
    updateFeature,
    setAllForApp,
    setPackageForApp,
    resetAll,
    appQuotes,
    appTotals,
    overallTotal,
    overallSubtotal,
    overallDiscount,
    totalFeatureCount,
    selectedFeatureCount,
  }
}
