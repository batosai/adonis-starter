import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import { passwordRules, PASSWORD_MIN_LENGTH } from './Rules/Password'
import { emailUniqueRules } from './Rules/Email'

export enum Roles {
  ADMIN = 'admin',
  MEMBER = 'member',
}
export default class UserValidator {
  constructor(protected ctx: HttpContextContract, protected user: User | void) {
    const fields = {
      username: schema.string([
        rules.escape(),
        rules.trim(),
        rules.minLength(2),
        rules.maxLength(255),
      ]),
      email: schema.string(emailUniqueRules(user)),
      password: user
        ? schema.string.optional(passwordRules())
        : schema.string(passwordRules()),
      avatar: schema.file.optional({
        extnames: ['jpg', 'png', 'jpeg', 'heic'],
        size: '2mb',
      }),
    }

    if (ctx.auth.user?.isAdmin && ctx.auth.user?.id !== user?.id) {
      fields['role'] = schema.enum(Object.values(Roles))
    }

    this.schema = schema.create(fields)
  }

  public schema
  public messages = {
    'username.required': 'Enter your username',
    'username.minLength': 'Username too short',
    'email.required': 'Email field is required',
    'email.unique': 'An account with this email already exists',
    'password.required': 'Password field is required',
    'password.minLength':
      'Password must be at least ' + PASSWORD_MIN_LENGTH + ' characters long',
    'password.oneLowerCaseAtLeast':
      'Password must contain at least one lowercase letter',
    'password.oneUpperCaseAtLeast':
      'Password must contain at least one uppercase letter',
    'password.oneNumericAtLeast': 'Password must contain at least one digit',
    'password.oneSpecialCharacterAtLeast':
      'Password must contain at least one special character',
    'password_confirmation.required': 'Password confirmation is required',
    'password_confirmation.confirmed':
      'Password and confirm password does not match.',
    'password_confirmation.minLength':
      'Password must be at least ' + PASSWORD_MIN_LENGTH + ' characters long',
  }
}
