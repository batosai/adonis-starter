import { rules } from '@ioc:Adonis/Core/Validator'

export function emailUniqueRules(user) {
  return [
    rules.email({ sanitize: true }),
    rules.unique(
      user
        ? {
            table: 'users',
            column: 'email',
            whereNot: {
              id: user.id,
            },
          }
        : {
            table: 'users',
            column: 'email',
          },
    ),
  ]
}

export function emailExistsRules() {
  return [
    rules.email({ sanitize: true }),
    rules.exists({
      table: 'users',
      column: 'email',
    }),
  ]
}
