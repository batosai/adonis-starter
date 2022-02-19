import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import ResetPasswordValidator from 'App/Validators/ResetPasswordValidator'

export default class ResetPasswordController {
  public async create({ request, view, params }: HttpContextContract) {
    const isSignatureValid = request.hasValidSignature()
    const email = params.email

    return view.render('auth/reset-password', { isSignatureValid, email })
  }

  public async store({ request, response, auth }: HttpContextContract) {
    const { email, password } = await request.validate(ResetPasswordValidator)

    const user = await User.findByOrFail('email', email)
    user.password = password
    await user.save()

    await auth.attempt(email, password)

    response.redirect('/admin')
  }
}
