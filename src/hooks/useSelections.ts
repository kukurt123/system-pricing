import { useEffect, useMemo, useState } from 'react'
import type { Application, Selections } from '../types'

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

  const resetAll = () => {
    const defaults = buildDefaults(apps)
    setSelections(defaults)
  }

  const appTotals = useMemo(() => {
    return apps.reduce<Record<string, number>>((acc, app) => {
      const appSelection = applyRequiredFeatures(app, selections[app.id] ?? getDefaultSelectionForApp(app))
      const total = app.features.reduce((sum, feature) => {
        const isEnabled = feature.required ? true : (appSelection[feature.id] ?? false)
        return isEnabled ? sum + feature.price : sum
      }, 0)
      acc[app.id] = total
      return acc
    }, {})
  }, [apps, selections])

  const overallTotal = useMemo(() => Object.values(appTotals).reduce((sum, value) => sum + value, 0), [appTotals])

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
    resetAll,
    appTotals,
    overallTotal,
    totalFeatureCount,
    selectedFeatureCount,
  }
}
