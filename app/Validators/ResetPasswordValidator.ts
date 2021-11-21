import { schema } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { passwordRules, PASSWORD_MIN_LENGTH } from './UserValidator'
import { emailRules } from './ForgotPasswordValidator'

export default class ResetPasswordValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    email: schema.string({}, emailRules()),
    password: schema.string({ trim: true }, passwordRules()),
  })

  public messages = {
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
