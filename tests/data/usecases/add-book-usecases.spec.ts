import { book } from '../../../src/domain/DTOs'
import { AddBook } from '../../../src/domain/usecases'
import { CheckBookByTitleRepository, AddBookRepository } from '../../../src/data/protocols/db'
import { CheckBookByTitleRepositorySpy, AddBookRepositorySpy } from '../mock'
import { bookParams } from '../../presentation/mocks'

export class AddBookUsecase implements AddBook{
    constructor(
        private readonly checkBookByTitleRepository : CheckBookByTitleRepository,
        private readonly addBookRepository : AddBookRepository
    ){}
    async add(data: book): Promise<Boolean>{
        const exist = this.checkBookByTitleRepository.checkBookBytitle(data.title)
        let isValid = false
        if(!exist){
            isValid = await this.addBookRepository.add(data)
        }
        return isValid
    }
}

const makeSut = () => {
    const checkBookByTitleRepositorySpy = new CheckBookByTitleRepositorySpy()
    const addBookRepositorySpy = new AddBookRepositorySpy()
    const sut = new AddBookUsecase(
        checkBookByTitleRepositorySpy,
        addBookRepositorySpy
    )   
    return {
        sut,
        checkBookByTitleRepositorySpy,
        addBookRepositorySpy
    }
}


describe('addBook use cases', () => {
    test('Should return false if checkBookByTitle return true',  async () => {
        const { sut } = makeSut()
        const isAdd = await sut.add(bookParams().body)
        expect(isAdd).toBe(false)
    })
})