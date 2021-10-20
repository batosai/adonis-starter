import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

enum Roles {
  ADMIN = 'admin',
  MEMBER = 'member',
}

export default class CreateUserValidator {
  constructor (protected ctx: HttpContextContract) {
  }

  public schema = schema.create({
    username: schema.string({
      escape: true,
      trim: true
    }, [
      rules.minLength(2),
    ]),
    role: schema.enum(Object.values(Roles)),
    email: schema.string({}, [
      rules.email(),
      rules.unique({
        table: 'users',
        column: 'email',
      }),
    ]),
    password: schema.string({ trim: true }, [
      rules.minLength(6),
      rules.confirmed()
    ]),
    avatar: schema.file({
      extnames: ['jpg', 'png', 'jpeg', 'heic'],
      size: '2mb',
    }),
  })

  public messages = {
    'username.required': 'Enter your username',
    'username.minLength': 'Username too short',
    'email.required': 'Enter your email',
    'email.unique': 'Email is already in use',
    'email.email': 'Invalid email address',
    'role.required': 'Enter your role',
    'password.required': 'Enter account password',
    'password.minLength': 'Password too short',
    'password_confirmation.confirmed': 'Confirmed validation failed',
  }
}
