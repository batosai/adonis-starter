/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer''
|
*/
import HealthCheck from '@ioc:Adonis/Core/HealthCheck'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', 'HomeController.index').as('home')

Route.get('signin', 'SigninController.create')
  .as('auth.signin')
  .middleware('guest')
Route.post('signin', 'SigninController.store').middleware('guest')
Route.get('forgot-password', 'ForgotPasswordController.create')
  .as('auth.password.forgot')
  .middleware('guest')
Route.post('forgot-password', 'ForgotPasswordController.store').middleware(
  'guest',
)
Route.get('reset-password/:email', 'ResetPasswordController.create')
  .as('auth.password.reset')
  .middleware('guest')
Route.post('reset-password', 'ResetPasswordController.store')
  .as('auth.password.reset.store')
  .middleware('guest')
Route.post('logout', 'SigninController.destroy')
  .as('auth.signout')
  .middleware('auth')

Route.group(() => {
  Route.get('/', 'admin/DashboardController.index')
    .as('admin_dashboard')
    .middleware('auth'),
    Route.resource('users', 'admin/UsersController')
      .as('admin.users')
      .except(['show'])
      .middleware({
        '*': ['auth'],
      })
  Route.patch('users/:id/lock', 'admin/UsersController.lock').as(
    'admin.users.lock',
  )
  Route.patch('users/:id/unlock', 'admin/UsersController.unlock').as(
    'admin.users.unlock',
  )
}).prefix('/admin')

Route.get('/health', async ({ response }: HttpContextContract) => {
  const report = await HealthCheck.getReport()
  return report.healthy ? response.ok(report) : response.badRequest(report)
})
