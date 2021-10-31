import { CheckBookByTitleRepository, AddBookRepository } from '../../../src/data/protocols/db'

export class CheckBookByTitleRepositorySpy implements CheckBookByTitleRepository{
    title : string
    result = true
    async checkBookBytitle(title: string): Promise<Boolean>{
        this.title = title
        return this.result
    }
}

export class AddBookRepositorySpy implements AddBookRepository{
    book : any
    result = true
    async add(book: any): Promise<boolean>{
        this.book = book
        return this.result
    }
}