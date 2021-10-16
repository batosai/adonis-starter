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

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', 'DashboardController.index').as('dashboard').middleware('auth')

Route.get('login', 'LoginController.create').as('login').middleware('guest')
Route.post('login', 'LoginController.store').middleware('guest')

Route.post('logout', 'LoginController.destroy').as('logout').middleware('auth')

Route.resource('users', 'UsersController').middleware('auth')
