import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateUserValidator {
  constructor (protected ctx: HttpContextContract) {
  }

  public schema = schema.create({
    username: schema.string(),
    email: schema.string({}, [
      rules.email(),
      rules.unique({
        table: 'users',
        column: 'email',
      }),
    ]),
    password: schema.string({}, [rules.minLength(6)]),
  })

  public messages = {
    'username.required': 'Enter your user name',
    'email.required': 'Enter your email',
    'email.unique': 'Email is already in use',
    'email.email': 'Invalid email address',
    'password.required': 'Enter account password',
    'password.minLength': 'Password too short',
  }
}
