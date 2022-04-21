import { rules } from '@ioc:Adonis/Core/Validator'

export const PASSWORD_MIN_LENGTH = 8
export const PASSWORD_MAX_LENGTH = 255

export function passwordRules() {
  const passwordRules = [
    rules.trim(),
    rules.minLength(PASSWORD_MIN_LENGTH),
    rules.maxLength(PASSWORD_MAX_LENGTH),
    rules.oneLowerCaseAtLeast(),
    rules.oneNumericAtLeast(),
    rules.oneUpperCaseAtLeast(),
    rules.oneSpecialCharacterAtLeast(),
    rules.confirmed(),
  ]
  return passwordRules
}
