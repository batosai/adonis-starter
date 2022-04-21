import { BasePolicy } from '@ioc:Adonis/Addons/Bouncer'
import User from 'App/Models/User'

export default class ImpersonatePolicy extends BasePolicy {
  public async create(currentUser: User, user: User) {
    return currentUser.isAdmin && currentUser.id !== user.id
  }

  public async delete(currentUser: User) {
    return currentUser.isAdmin
  }
}
