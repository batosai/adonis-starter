import { BaseMailer, MessageContract } from '@ioc:Adonis/Addons/Mail'
import I18n from '@ioc:Adonis/Addons/I18n'
import Env from '@ioc:Adonis/Core/Env'
import Route from '@ioc:Adonis/Core/Route'
import User from 'App/Models/User'

export default class ForgotPasswordMailer extends BaseMailer {
  constructor(private user: User) {
    super()
  }

  public prepare(message: MessageContract) {
    const url = Route.builder()
      .prefixUrl(Env.get('APP_URL'))
      .params({ email: this.user.email })
      .makeSigned('auth.password.reset', {
        expiresIn: '1h',
      })

    message
      .from(Env.get('FROM_EMAIL'), 'Adonis')
      .to(this.user.email, this.user.username)
      .subject(
        I18n.locale(I18n.defaultLocale).formatMessage('emails.forgot.subject'),
      )
      .htmlView('emails/auth/forgot-password', {
        user: this.user,
        url,
      })
      .textView('emails/auth/forgot-password-plain', {
        user: this.user,
        url,
      })
  }
}
