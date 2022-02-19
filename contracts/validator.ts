declare module '@ioc:Adonis/Core/Validator' {
  interface Rules {
    oneLowerCaseAtLeast(): Rule
    oneNumericAtLeast(): Rule
    oneUpperCaseAtLeast(): Rule
    oneSpecialCharacterAtLeast(): Rule
    freeEventOrNotExist(): Rule
  }
}
