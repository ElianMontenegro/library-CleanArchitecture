import { AddBook } from '../../../src/domain/usecases'


export class AddBookSpy implements AddBook{
    params : AddBook.Params 
    result = true
    async add(data: AddBook.Params): Promise<Boolean>{
        this.params = data
        return this.result
    }
}