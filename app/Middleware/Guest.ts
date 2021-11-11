import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

/**
 * A middleware to redirect logged in users to the home page. Mainly
 * used to redirect a logged in user away from the "signup" and
 * "login" pages.
 */
export default class Guest {
  public async handle(
    { auth, response }: HttpContextContract,
    next: () => Promise<void>,
  ) {
    try {
      await auth.authenticate()
      if (auth.isLoggedIn) {
        response.redirect('/')
        return
      }
    } catch {
      await next()
    }
  }
}
