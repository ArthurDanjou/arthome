// auth.d.ts
import type { Subscription } from '~~/types/types'

declare module '#auth-utils' {
  interface User {
    id: number
    name: string
    username: string
    email: string
    avatar: string | null
    githubId?: number | null
    googleId?: string | null
    description: string
    private: boolean
    language: string
    location: string
    subscription: Subscription
  }

  interface UserSession {

  }
}

export {}
