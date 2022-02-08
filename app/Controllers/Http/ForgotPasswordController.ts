import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import ForgotPasswordValidator from 'App/Validators/ForgotPasswordValidator'
import ForgotPasswordMailer from 'App/Mailers/ForgotPasswordMailer'

export default class ForgotPasswordController {
  public async create({ view }: HttpContextContract) {
    return view.render('auth/forgot-password')
  }

  public async store({ request, response }: HttpContextContract) {
    const payload = await request.validate(ForgotPasswordValidator)

    const user = await User.findByOrFail('email', payload.email)

    await new ForgotPasswordMailer(user).sendLater()

    response.redirect('/signin')
  }
}
