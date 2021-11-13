import { AddBook } from '../../../src/domain/usecases'
import { bookInputDTO } from '../../../src/domain/DTOs'

export class AddBookSpy implements AddBook{
    params : bookInputDTO
    result = true
    async add(data: bookInputDTO): Promise<Boolean>{
        this.params = data
        return this.result
    }
}