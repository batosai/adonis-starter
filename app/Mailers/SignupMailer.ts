import { BaseMailer, MessageContract } from '@ioc:Adonis/Addons/Mail'
import Env from '@ioc:Adonis/Core/Env'
import Route from '@ioc:Adonis/Core/Route'
import User from 'App/Models/User'

export default class SignupMailer extends BaseMailer {

  constructor (private user: User) {
    super()
  }

  public prepare(message: MessageContract) {
    const url = Route.builder()
      .prefixUrl(Env.get('APP_URL'))
      .params({ email: this.user.email })
      .makeSigned('auth.password.reset', {
        expiresIn: '1h'
    })

    message
      .from('noreply@example.com', 'Admin')
      .to(this.user.email, this.user.username)
      .htmlView('emails/auth/signup', {
        user: this.user,
        url,
      })
      .textView('emails/auth/signup', {
        user: this.user,
        url,
      })
  }
}
