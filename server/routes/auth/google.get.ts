export default oauthGoogleEventHandler({
  config: {
    emailRequired: true,
    scope: ['email', 'profile'],
  },
  async onSuccess(event, { user: oauthUser, tokens }) {
    const userSession = await getUserSession(event)

    // If the user is already signed in, link the account
    if (userSession?.id) {
      const user = await findUserById(userSession.id)

      if (user) {
        await updateUser(userSession.id, {
          googleId: oauthUser.sub,
          googleToken: tokens.access_token,
        })

        await setUserSession(event, {
          id: userSession.id,
          user: userSession,
          googleId: oauthUser.sub,
        })

        return sendRedirect(event, '/')
      }
    }

    // If the user is not signed in, search for an existing user with that Google ID
    // If it exists, sign in as that user and refresh the token
    let user = await findUserByGoogleId(oauthUser.sub)

    if (user) {
      await updateUser(user.id, {
        googleId: oauthUser.sub,
        googleToken: tokens.access_token,
      })

      await setUserSession(event, {
        id: user.id,
        user,
      })

      return sendRedirect(event, '/')
    }

    // If the user is not signed in, search for an existing user with that email address without a Google ID
    // If it exists, tells the user to sign in with that account and link the Google account
    user = await findUserBy(
      and(
        eq(tables.users.email, oauthUser.email),
        isNull(tables.users.googleId),
      ),
    )

    if (user) {
      await updateSession(event, {
        password: useRuntimeConfig(event).session.password,
      }, {
        message: 'An existing account for this email already exists. Please login and visit your profile settings to add support for Google authentication.',
      })
      return sendRedirect(event, '/login')
    }

    // If the user is not signed in and no user exists with that Google ID or email address, create a new user
    const createdUser = await createUser({
      username: oauthUser.name.toLowerCase() as string,
      description: '',
      name: `${oauthUser.given_name} ${oauthUser.family_name}`,
      email: oauthUser.email as string,
      avatar: oauthUser.picture as string,
      googleId: oauthUser.sub as number,
      googleToken: tokens.access_token as string,
      language: 'en-EN',
      location: 'unknown',
      private: false,
      subscription: 'free',
    })

    await setUserSession(event, {
      id: createdUser.id,
      user: createdUser,
    })

    return sendRedirect(event, '/')
  },
})
