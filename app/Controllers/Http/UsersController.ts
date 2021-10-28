import User from 'App/Models/User'
import Application from '@ioc:Adonis/Core/Application'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { Attachment } from '@ioc:Adonis/Addons/AttachmentLite'
import CreateUserValidator from 'App/Validators/CreateUserValidator'
import UpdateUserValidator from 'App/Validators/UpdateUserValidator'
import Database from '@ioc:Adonis/Lucid/Database'

export default class UsersController {
  public async index({ request, view }: HttpContextContract) {

    const page = request.input('page', 1)
    const limit = 10

    const users = await Database.from('users').paginate(page, limit)

    return view.render('users.index', {
      users
    })
  }

  public async create({ view }: HttpContextContract) {
    return view.render('users.create')
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
    await user.fill(payload)

    if (avatar) {
      user.avatar = Attachment.fromFile(avatar)
    }
    await user.save()

    response.redirect().toPath('/users')
  }

  public async edit({ request, view }: HttpContextContract) {
    const user = await User.findOrFail(request.param('id'))
    return view.render('users.edit', {
      user
    })
  }

  public async update({ request, response, auth }: HttpContextContract) {
    const user = await User.findOrFail(request.param('id'))
    const avatar = request.file('avatar')!

    const payload = await request.validate(new UpdateUserValidator({
      user
    }))

    await user.merge(payload)

    if (avatar) {
      user.avatar = Attachment.fromFile(avatar)
    }
    await user.save()

    response.redirect().toPath('/users')
  }

  public async destroy({ params, response }: HttpContextContract) {
    const { id }  = params;
    const user = await User.findOrFail(id)
    await user.delete()
    response.redirect().toPath('/users')
  }
}

// todo type enum en db
// optim controller / validator / view et form
// Validation delete
