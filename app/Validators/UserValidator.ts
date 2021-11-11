import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export enum Roles {
  ADMIN = 'admin',
  MEMBER = 'member',
}

const PASSWORD_MIN_LENGTH = 8
const PASSWORD_MAX_LENGTH = 255

function passwordRules() {
  const passwordRules = [
    rules.minLength(PASSWORD_MIN_LENGTH),
    rules.maxLength(PASSWORD_MAX_LENGTH),
    rules.oneLowerCaseAtLeast(),
    rules.oneNumericAtLeast(),
    rules.oneUpperCaseAtLeast(),
    rules.oneSpecialCharacterAtLeast(),
    rules.confirmed()
  ]
  return passwordRules
}

function emailRules(user) {
  return [
    rules.email({ sanitize: true }),
    rules.unique(user ? {
      table: 'users',
      column: 'email',
      whereNot: {
        id: user.id
      }
    } : {
      table: 'users',
      column: 'email',
    }),
  ]
}
export default class UserValidator {
  constructor (protected ctx: HttpContextContract) {
  }

  public schema = schema.create({
    username: schema.string({
      escape: true,
      trim: true
    }, [
      rules.minLength(2),
      rules.maxLength(255)
    ]),
    role: schema.enum(Object.values(Roles)),
    email: schema.string({}, emailRules(this.ctx.user)),
    password: this.ctx.user ?
      schema.string.optional({ trim: true }, passwordRules()) :
      schema.string({ trim: true }, passwordRules()
    ),
    avatar: schema.file.optional({
      extnames: ['jpg', 'png', 'jpeg', 'heic'],
      size: '2mb',
    }),
  })

  public messages = {
    'username.required': 'Enter your username',
    'username.minLength': 'Username too short',
    "email.required": "Email field is required",
    "email.unique": "An account with this email already exists",
    "password.required": "Password field is required",
    "password.minLength":
      "Password must be at least " + PASSWORD_MIN_LENGTH + " characters long",
    "password.oneLowerCaseAtLeast":
      "Password must contain at least one lowercase letter",
    "password.oneUpperCaseAtLeast":
      "Password must contain at least one uppercase letter",
    "password.oneNumericAtLeast": "Password must contain at least one digit",
    "password.oneSpecialCharacterAtLeast":
      "Password must contain at least one special character",
    "password_confirmation.required": "Password confirmation is required",
    "password_confirmation.confirmed":
      "Password and confirm password does not match.",
    "password_confirmation.minLength":
      "Password must be at least " + PASSWORD_MIN_LENGTH + " characters long",
  }
}
