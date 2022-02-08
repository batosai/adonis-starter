import User from 'App/Models/User'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { Attachment } from '@ioc:Adonis/Addons/AttachmentLite'
import Route from '@ioc:Adonis/Core/Route'
import UserValidator from 'App/Validators/UserValidator'
import UserLockValidator from 'App/Validators/UserLockValidator'
import SignupMailer from 'App/Mailers/SignupMailer'

export default class UsersController {
  public async index({ request, view, bouncer }: HttpContextContract) {
    await bouncer.with('UserPolicy').authorize('viewList')

    const page = request.input('page', 1)
    const limit = 10

    const users = await User.query().paginate(page, limit)
    users.baseUrl(Route.builder().make('admin_users.index'))

    return view.render('admin/users/index', {
      users,
    })
  }

  public async create({ view, bouncer }: HttpContextContract) {
    await bouncer.with('UserPolicy').authorize('create')
    return view.render('admin/users/create')
  }

  public async store({ request, response, bouncer }: HttpContextContract) {
    await bouncer.with('UserPolicy').authorize('create')
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

    await new SignupMailer(user).sendLater()

    response.redirect().toRoute('admin_users.index')
  }

  public async edit({ request, view, bouncer }: HttpContextContract) {
    const user = await User.findOrFail(request.param('id'))
    await bouncer.with('UserPolicy').authorize('update', user)

    return view.render('admin/users/edit', {
      user,
    })
  }

  public async update(ctx: HttpContextContract) {
    const { request, response, auth, bouncer } = ctx
    const user = await User.findOrFail(request.param('id'))

    if (request.method() === 'PATCH') {
      await bouncer.with('UserPolicy').authorize('lock', user)
      const payload = await request.validate(UserLockValidator)
      await user.merge(payload)
      await user.save()
    } else {
      await bouncer.with('UserPolicy').authorize('update', user)
      const avatar = request.file('avatar')!

      const payload = await request.validate(new UserValidator(ctx, user))

      await user.merge(payload)

      if (avatar) {
        user.avatar = Attachment.fromFile(avatar)
      }
      await user.save()
    }

    if (auth.user?.isAdmin) {
      response.redirect().toRoute('admin_users.index')
    } else {
      response.redirect().toRoute('admin/DashboardController.index')
    }
  }

  public async destroy({ params, response, bouncer }: HttpContextContract) {
    const { id } = params
    const user = await User.findOrFail(id)
    await bouncer.with('UserPolicy').authorize('delete', user)
    await user.delete()
    response.redirect().toRoute('admin_users.index')
  }
}
