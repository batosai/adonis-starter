import User from 'App/Models/User'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { Attachment } from '@ioc:Adonis/Addons/AttachmentLite'
import UserValidator from 'App/Validators/UserValidator'

export default class UsersController {
  public async index({ request, view, auth, bouncer }: HttpContextContract) {
    await bouncer.with('UserPolicy').authorize('viewList', auth.user)

    const page = request.input('page', 1)
    const limit = 10

    const users = await User.query().paginate(page, limit)

    return view.render('users.index', {
      users,
    })
  }

  public async create({ view, auth, bouncer }: HttpContextContract) {
    await bouncer.with('UserPolicy').authorize('create', auth.user)
    return view.render('users.create')
  }

  public async store({
    request,
    response,
    auth,
    bouncer,
  }: HttpContextContract) {
    await bouncer.with('UserPolicy').authorize('create', auth.user)
    const avatar = request.file('avatar')!
    /**
     * Validate new user account creation form
     */
    const payload = await request.validate(UserValidator)

    /**
     * Create a new user
     */
    const user = new User()
    await user.fill(payload)

    if (avatar) {
      user.avatar = Attachment.fromFile(avatar)
    }
    await user.save()

    response.redirect().toPath('/users')
  }

  public async edit({ request, view, auth, bouncer }: HttpContextContract) {
    const user = await User.findOrFail(request.param('id'))
    await bouncer.with('UserPolicy').authorize('update', auth.user, user)

    return view.render('users.edit', {
      user,
    })
  }

  public async update({
    request,
    response,
    auth,
    bouncer,
  }: HttpContextContract) {
    const user = await User.findOrFail(request.param('id'))
    await bouncer.with('UserPolicy').authorize('update', auth.user, user)
    const avatar = request.file('avatar')!

    const payload = await request.validate(
      new UserValidator({
        user,
      }),
    )

    await user.merge(payload)

    if (avatar) {
      user.avatar = Attachment.fromFile(avatar)
    }
    await user.save()

    if (user.isAdmin) {
      response.redirect().toPath('/users')
    } else {
      response.redirect().toPath('/')
    }
  }

  public async destroy({
    params,
    response,
    auth,
    bouncer,
  }: HttpContextContract) {
    await bouncer.with('UserPolicy').authorize('delete', auth.user)
    const { id } = params
    const user = await User.findOrFail(id)
    await user.delete()
    response.redirect().toPath('/users')
  }
}

// todo type enum en db
// gestion des roles
