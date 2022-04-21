import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class ImpersonatesController {
  public async store({ session, bouncer, params, response }: HttpContextContract) {
    const impersonatedUser = await User.find(params.id)
    await bouncer.with('ImpersonatePolicy').authorize('create', impersonatedUser!)

    session.put('impersonatedId', params.id)

    return response.redirect('/')
  }

  public async destroy({ session, bouncer, response }: HttpContextContract) {
    await bouncer.with('ImpersonatePolicy').authorize('delete')
    session.forget('impersonatedId')

    return response.redirect('/')
  }
}
