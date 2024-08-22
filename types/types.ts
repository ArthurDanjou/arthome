import type { ParsedContent } from '@nuxt/content'

export interface AppType extends ParsedContent {
  primary?: boolean
  name: string
  nuxt?: string
  url: string
  icon: string
  color: string
  tags: Tag[]
}

export interface Tag {
  name: string
  color: string
}

export interface OpenWeatherType {
  weather: Array<{
    description: string
  }>
  main: {
    feels_like: number
  }
  name: string
}

export interface WeatherType {
  city: string
  weather: {
    type: string
    description: string
  }
  temp: number
}
