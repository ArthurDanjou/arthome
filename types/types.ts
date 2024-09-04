import { z } from 'zod'

export const COLORS = ['gray', 'red', 'orange', 'amber', 'yellow', 'lime', 'green', 'emerald', 'teal', 'cyan', 'sky', 'blue', 'indigo', 'violet', 'purple', 'fuchsia', 'pink', 'rose']

export const Subscription = ['free', 'paid'] as const

export const IconsCollection = [
  'ph',
  'heroicons',
  'vscode-icons',
  'simple-icons',
] as const

// Category
export const CreateCategorySchema = z.object({
  name: z.string().min(4).max(20),
  icon: z.string(),
  color: z.enum(COLORS).default('gray'),
  nameVisible: z.boolean().optional().default(false),
})
export const CreateCategorySchemaType = z.infer<typeof CreateCategorySchema>

export const UpdateCategorySchema = z.object({
  name: z.string().min(4).max(20).optional(),
  icon: z.string().optional(),
  color: z.string().optional(),
  nameVisible: z.boolean().optional().default(false),
})
export const UpdateCategorySchemaType = z.infer<typeof UpdateCategorySchema>

export interface CategoryType {
  id: number
  name: string
  icon: string
  color: string
  nameVisible: boolean
}

// Tab
export const CreateTabSchema = z.object({
  name: z.string().min(4).max(20),
  icon: z.string(),
  color: z.enum(COLORS).default('gray'),
  primary: z.boolean().default(false),
  link: z.string(),
  categoryId: z.number(),
})
export const CreateTabSchemaType = z.infer<typeof CreateTabSchema>

export const UpdateTabSchema = z.object({
  name: z.string().min(4).max(20).optional(),
  icon: z.string().optional(),
  color: z.enum(COLORS).default('gray').optional(),
  primary: z.boolean().optional(),
  link: z.string().optional(),
  categoryId: z.number(),
})
export const UpdateTabSchemaType = z.infer<typeof UpdateTabSchema>

export interface TabType {
  id: number
  name: string
  icon: string
  color: string
  primary: boolean
  categoryId: number
  link: string
}

// User
export const UpdateUserSchema = z.object({
  name: z.string().min(3).max(25).optional(),
  username: z.string().optional(),
  description: z.string().optional(),
  location: z.string().optional(),
  language: z.string().optional(),
  private: z.boolean().optional().default(false),
})
export const UpdateUserSchemaType = z.infer<typeof UpdateUserSchema>

export interface OpenWeatherType {
  weather: Array<{
    main: string
    description: string
  }>
  temp: {
    feels_like: number
    temp_min: number
    temp_max: number
    humidity: number
  }
  wind: { speed: number }
  name: string
}

export interface WeatherType {
  city: string
  weather: {
    type: string
    description: string
  }
  temp: {
    feels_like: number
    min: number
    max: number
    humidity: number
  }
  wind: number
}

export const locales = [
  {
    locale: 'en-EN',
    label: 'English',
  },
  {
    locale: 'es-ES',
    label: 'Spanish',
  },
  {
    locale: 'fr-FR',
    label: 'French',
  },
]
