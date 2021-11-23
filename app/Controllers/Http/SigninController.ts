import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { DateTime } from 'luxon'

/**
 * Handle user login and logout requests.
 */
export default class SigninController {
  /**
   * Show form to login
   */
  public async create({ view }: HttpContextContract) {
    return view.render('auth/signin')
  }

  /**
   * Handle login form submissions
   */
  public async store({ request, response, auth, session }: HttpContextContract) {

    await auth.attempt(request.input('email'), request.input('password'), request.input('remember_me'))

    auth.user.last_login_at = DateTime.local()
    await auth.user.save()

    if (auth.user?.blocked) {
      session.flash('auth.blocked', 'Your account is blocked.')
      session.clear();
      return response.redirect('/signin')
    }

    /**
     * Redirect to the home page
     */
    response.redirect('/admin')
  }

  /**
   * Destroy user session (aka logout)
   */
  public async destroy({ auth, response }: HttpContextContract) {
    await auth.logout()
    response.redirect('/admin')
  }
}
