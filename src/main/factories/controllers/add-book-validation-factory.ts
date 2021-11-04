import { Validation } from '../../../presentation/protocols'
import { RequiredFieldValidation } from '../../../validation/validators/required-field-validation'
import { ValidationComposite } from '../../../validation/validators/validator-composite'

export const makeAddBookValidation = (): ValidationComposite => {
    const validations: Validation[] = []
    const paramsBook = [
      'title', 'autor', 'categoryId', 'language', 
      'countryId', 'isbn', 'year', 'numberPage', 'editorial'
    ]
    for (const field of paramsBook) {
      validations.push(new RequiredFieldValidation(field))
    }
    return new ValidationComposite(validations)
}