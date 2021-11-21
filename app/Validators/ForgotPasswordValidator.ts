import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export function emailRules() {
  return [
    rules.email({ sanitize: true }),
    rules.exists({
      table: 'users',
      column: 'email',
    }),
  ]
}

export default class ForgotPasswordValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    email: schema.string({}, emailRules()),
  })

  public messages = {
    'email.required': 'Email field is required',
    'email.unique': 'An account with this email already exists',
  }
}
