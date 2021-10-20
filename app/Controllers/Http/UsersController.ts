import User from 'App/Models/User'
import Application from '@ioc:Adonis/Core/Application'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { Attachment } from '@ioc:Adonis/Addons/AttachmentLite'
import CreateUserValidator from 'App/Validators/CreateUserValidator'
import Database from '@ioc:Adonis/Lucid/Database'

export default class UsersController {
  public async index({ request, view }: HttpContextContract) {

    const page = request.input('page', 1)
    const limit = 10

    const users = await Database.from('users').paginate(page, limit)

    return view.render('pages/users/index', {
      users
    })
  }

  public async create({ view }: HttpContextContract) {
    return view.render('pages/users/create')
  }

  public async store({ request, response, auth }: HttpContextContract) {
    const avatar = request.file('avatar')!
    /**
     * Validate new user account creation form
     */
    const payload = await request.validate(CreateUserValidator)

    /**
     * Create a new user
     */
    // const user = await User.create(payload)
    // await payload.avatar.move(Application.tmpPath('uploads'))

    const user = new User()
    await user
      .fill(payload)

    user.avatar = Attachment.fromFile(avatar)
    await user.save()

    response.redirect().toPath('/users')
  }
}
