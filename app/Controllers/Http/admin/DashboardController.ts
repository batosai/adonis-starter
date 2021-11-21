import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class DashboardController {
  public async index({ view }: HttpContextContract) {
    return view.render('admin/dashboard/index')
  }
}
