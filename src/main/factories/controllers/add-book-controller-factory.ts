import { AddBookController } from '../../../presentation/controllers/add-book-controller'
import { makeAddBookUseCases } from '../use-cases/add-book-usecase-factory'
import { makeAddBookValidation } from './add-book-validation-factory'

export const makeAddBookController = (): AddBookController => {
    return new AddBookController(makeAddBookValidation(), makeAddBookUseCases())
}