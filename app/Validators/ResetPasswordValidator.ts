import { schema } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { passwordRules, PASSWORD_MIN_LENGTH } from './Rules/Password'
import { emailExistsRules } from './Rules/Email'

export default class ResetPasswordValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    email: schema.string(emailExistsRules()),
    password: schema.string(passwordRules()),
  })

  public messages = {
    ...this.ctx.i18n.validatorMessages('validator.shared'),
    'password.minLength': this.ctx.i18n.formatMessage(
      'validator.shared.password.minLength',
      {
        password_min_length: PASSWORD_MIN_LENGTH,
      },
    ),
    'password_confirmation.minLength': this.ctx.i18n.formatMessage(
      'validator.shared.password_confirmation.minLength',
      {
        password_min_length: PASSWORD_MIN_LENGTH,
      },
    ),
  }
}
