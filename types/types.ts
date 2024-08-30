import { z } from 'zod'

export const COLORS = ['gray', 'slate', 'zinc', 'neutral', 'stone', 'red', 'orange', 'amber', 'yellow', 'lime', 'green', 'emerald', 'teal', 'cyan', 'sky', 'blue', 'indigo', 'violet', 'purple', 'fuchsia', 'pink', 'rose']

export const Subscription = ['free', 'paid'] as const

// Category
export const CreateCategorySchema = z.object({
  name: z.string().min(4),
  icon: z.string(),
  color: z.enum(COLORS).default('gray'),
  nameVisible: z.boolean().optional().default(false),
})
export const CreateCategorySchemaType = z.infer<typeof CreateCategorySchema>

export const UpdateCategorySchema = z.object({
  name: z.string().min(4).optional(),
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
  name: z.string().min(4),
  icon: z.string(),
  color: z.enum(COLORS).default('gray'),
  primary: z.boolean().optional().default(false),
  link: z.string(),
  categoryId: z.number(),
})
export const CreateTabSchemaType = z.infer<typeof CreateTabSchema>

export const UpdateTabSchema = z.object({
  name: z.string().min(4).optional(),
  icon: z.string().optional(),
  color: z.enum(COLORS).default('gray').optional(),
  primary: z.boolean().optional().default(false),
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
