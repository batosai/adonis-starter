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

Route.get('/', 'HomeController.index').as('home').middleware('impersonate')
Route.post('/impersonate/:id', 'ImpersonatesController.store').as('impersonate.store').middleware('auth')
Route.delete('/impersonate', 'ImpersonatesController.destroy').as('impersonate.destroy').middleware('auth')

import './routes/auth'
import './routes/admin'

Route.get('/health', async ({ response }: HttpContextContract) => {
  const report = await HealthCheck.getReport()
  return report.healthy ? response.ok(report) : response.badRequest(report)
})
