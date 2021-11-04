import { AddBookUsecase } from '../../../data/usecases/book'
import { BookMongoRepository } from '../../../infra/db/mongo/book-mongo-repository'
export const makeAddBookUseCases = (): AddBookUsecase => {
    const bookMongoRepository = new BookMongoRepository()
    return new AddBookUsecase(bookMongoRepository, bookMongoRepository)
}