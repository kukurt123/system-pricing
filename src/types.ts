export type Feature = {
  id: string
  name: string
  description: string
  highlights?: string[]
  image?: string
  price: number
}

export type Application = {
  id: string
  name: string
  tagline: string
  image?: string
  features: Feature[]
}

export type Selections = Record<string, Record<string, boolean>>
