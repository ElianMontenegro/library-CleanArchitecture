import { EmailValidatorAdapter } from "src/infra/validator/email-validator-adapter"
import { Validation } from "src/presentation/protocols"
import { EmailValidation, RequiredFieldValidation, CompareFieldsValidation, ValidationComposite } from "src/validation/validators"


export const makeSignupValidation = (): ValidationComposite => {
    const validations: Validation[] = []
    const paramsSignup = [ 'username', 'email', 'password', 'repeatPassword' ]
    for (const field of paramsSignup) {
        validations.push(new RequiredFieldValidation(field))
    }
    validations.push(new CompareFieldsValidation('password', 'repeatPassword'))
    validations.push(new EmailValidation('email', new EmailValidatorAdapter()))
    return new ValidationComposite(validations)
}