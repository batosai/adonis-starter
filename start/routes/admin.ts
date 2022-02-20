import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/', 'admin/DashboardController.index')
    .as('admin_dashboard')
    .middleware('auth')
  Route.resource('users', 'admin/UsersController')
    .as('admin.users')
    .except(['show'])
    .middleware({ '*': ['auth'] })
  Route.patch('users/:id/lock', 'admin/UsersController.lock')
    .as('admin.users.lock')
    .middleware('auth')
  Route.patch('users/:id/unlock', 'admin/UsersController.unlock')
    .as('admin.users.unlock')
    .middleware('auth')
}).prefix('/admin')
