import Route from '@ioc:Adonis/Core/Route'

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
