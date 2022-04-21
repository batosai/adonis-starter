import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class Impersonate {
  public async handle({auth, session}: HttpContextContract, next: () => Promise<void>) {
    if (session.has('impersonatedId')) {
      const impersonatedUser = await User.find(session.get('impersonatedId'))

      auth.use('web').user = impersonatedUser!
    }

    await next()
  }
}
