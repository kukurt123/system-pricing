export type FeatureVideoSource = {
  src: string
  poster: string
  durationLabel: string
  youtubeId?: string
}

export type Feature = {
  id: string
  name: string
  description: string
  highlights?: string[]
  image?: string
  price: number
  video?: FeatureVideoSource
  localModels?: { name: string; memory: string; capability: string; recommended?: boolean }[]
  pricingNote?: string
  required?: boolean
  recommended?: boolean
  addon?: boolean
}

export type Application = {
  id: string
  name: string
  tagline: string
  image?: string
  features: Feature[]
}

export type Selections = Record<string, Record<string, boolean>>
