import { EmailValidator } from 'src/validation/protocols'
import { Validation } from 'src/presentation/protocols'
import { InvalidParamError } from 'src/presentation/errors/invalid-param-error'

export class EmailValidation implements Validation {
  constructor (
    private readonly fieldName: string,
    private readonly emailValidator: EmailValidator
  ) {}

  validate (input: any): Error {
    const isValid = this.emailValidator.isValid(input[this.fieldName])
    if (!isValid) {
      return new InvalidParamError(this.fieldName)
    }
  }
}