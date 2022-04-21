import { BasePolicy } from '@ioc:Adonis/Addons/Bouncer'
import User from 'App/Models/User'

export default class UserPolicy extends BasePolicy {
  public async viewList(currentUser: User) {
    return currentUser.isAdmin
  }

  public async view(currentUser: User, user: User) {
    return currentUser.isAdmin || currentUser.id === user.id
  }

  public async create(currentUser: User) {
    return currentUser.isAdmin
  }

  public async update(currentUser: User, user: User) {
    return currentUser.isAdmin || currentUser.id === user.id
  }

  public async delete(currentUser: User, user: User) {
    return currentUser.isAdmin && currentUser.id !== user.id
  }

  public async lock(currentUser: User, user: User) {
    return currentUser.isAdmin && currentUser.id !== user.id
  }

  public async role(currentUser: User, user: User) {
    return currentUser.isAdmin && currentUser.id !== user?.id
  }
}
