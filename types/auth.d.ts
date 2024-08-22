// auth.d.ts
declare module '#auth-utils' {
  interface User {
    email: string
    name: string
  }

  interface UserSession {
    email: string
    name: string
  }
}

export {}
