import { schema } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UserLockValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    blocked: schema.boolean(),
  })
}
