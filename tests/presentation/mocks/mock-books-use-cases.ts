import { AddBook } from '../../../src/domain/usecases'


export class AddBookSpy implements AddBook{
    params : AddBook.Params 
    async add(data: AddBook.Params): Promise<void>{
        this.params = data
    }
}