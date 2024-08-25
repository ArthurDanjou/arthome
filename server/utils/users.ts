import type { SQL } from 'drizzle-orm'
import type { UserInsert } from '~~/server/utils/db'

export async function findUserById(userId: number) {
  return useDrizzle()
    .query
    .users
    .findFirst({
      where: eq(tables.users.id, userId),
    })
}

export async function findUserByGitHubId(githubId: number) {
  return useDrizzle()
    .query
    .users
    .findFirst({
      where: eq(tables.users.githubId, githubId),
    })
}

export async function findUserByGoogleId(googleId: string) {
  return useDrizzle()
    .query
    .users
    .findFirst({
      where: eq(tables.users.googleId, googleId),
    })
}

export async function findUserBy(query: SQL | undefined) {
  return useDrizzle()
    .query
    .users
    .findFirst({
      where: query,
    })
}

export async function createUser(user: UserInsert) {
  return useDrizzle()
    .insert(tables.users)
    .values(user)
    .returning()
}

export async function updateUser(userId: number, user: Partial<UserInsert>) {
  return useDrizzle()
    .update(tables.users)
    .set(user)
    .where(eq(tables.users.id, userId))
}

export async function deleteProfilePicture(avatar: string) {
  if (avatar.startsWith('profile-pictures/')) {
    await hubBlob().delete(avatar)
  }
}
