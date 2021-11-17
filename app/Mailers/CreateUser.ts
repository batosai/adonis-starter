import { BaseMailer, MessageContract } from '@ioc:Adonis/Addons/Mail'
import User from 'App/Models/User'

export default class CreateUser extends BaseMailer {

  constructor (private user: User) {
    super()
  }

  public prepare(message: MessageContract) {
    message
      .from('admin@example.com', 'Admin')
      .to(this.user.email, 'Mr foo')
      .htmlView('emails/welcome', {
        user: this.user,
      })
  }
}
