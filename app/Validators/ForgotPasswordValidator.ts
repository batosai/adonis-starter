import { schema } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { emailExistsRules } from './Rules/Email'
export default class ForgotPasswordValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    email: schema.string({}, emailExistsRules()),
  })

  public messages = {
    'email.required': 'Email field is required',
    'email.unique': 'An account with this email already exists',
  }
}
