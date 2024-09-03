export default oauthGitHubEventHandler({
  config: {
    emailRequired: true,
  },
  async onSuccess(event, { user: oauthUser, tokens }) {
    // If the user is not signed in, search for an existing user with that GitHub ID
    // If it exists, sign in as that user and refresh the token
    let user = await findUserByGitHubId(oauthUser.id)

    if (user) {
      await updateUser(user.id, {
        githubId: oauthUser.id,
        githubToken: tokens.access_token,
      })

      await replaceUserSession(event, {
        id: user.id,
        user,
      })

      return sendRedirect(event, '/')
    }

    // If the user is not signed in, search for an existing user with that email address without a GitHub ID
    // If it exists, tells the user to sign in with that account and link the GitHub account
    user = await findUserBy(
      and(
        eq(tables.users.email, oauthUser.email),
        isNull(tables.users.githubId),
      ),
    )

    if (user) {
      await updateSession(event, {
        password: useRuntimeConfig(event).session.password,
      }, {
        message: 'An existing account for this email already exists. Please login and visit your profile settings to add support for GitHub authentication.',
      })
      return sendRedirect(event, '/login')
    }

    // If the user is not signed in and no user exists with that GitHub ID or email address, create a new user
    const createdUser = await createUser({
      username: oauthUser.login.toLowerCase().trim() as string,
      description: oauthUser.bio as string,
      name: oauthUser.name as string,
      email: oauthUser.email as string,
      avatar: oauthUser.avatar_url as string,
      githubId: oauthUser.id as number,
      githubToken: tokens.access_token as string,
      language: 'en-EN',
      location: 'unknown',
      private: false,
      subscription: 'free',
    })

    await replaceUserSession(event, {
      id: createdUser.id,
      user: createdUser[0],
    })

    return sendRedirect(event, '/')
  },
})
