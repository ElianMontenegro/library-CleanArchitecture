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
        const exist = await this.checkBookByTitleRepository.checkBookBytitle(data.title)
        let isValid = false
        if(!exist){
            isValid = await this.addBookRepository.add(data);
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
        const { sut, checkBookByTitleRepositorySpy } = makeSut()
        checkBookByTitleRepositorySpy.result = true
        const isAdd = await sut.add(bookParams().body)
        expect(isAdd).toBe(false)
    })

    test('Should return true if checkBookByTitle return false',  async () => {
        const { sut, checkBookByTitleRepositorySpy } = makeSut()
        checkBookByTitleRepositorySpy.result = false
        const isAdd = await sut.add(bookParams().body)
        expect(isAdd).toBe(true)
    })

    test('Should call checkBookByTitleRepositorySpy with correct email', async () => {
        const { sut, checkBookByTitleRepositorySpy } = makeSut()
        const addBookParams = bookParams().body
        await sut.add(addBookParams)
        expect(checkBookByTitleRepositorySpy.title).toBe(addBookParams.title)
    })
    
    test('Should return false if addBookRepositorySpy returns false', async () => {
        const { sut, addBookRepositorySpy } = makeSut()
        addBookRepositorySpy.result = false
        const isValid = await sut.add(bookParams().body)
        expect(isValid).toBe(false)
    })

    test('Should throw error if addBookRepositorySpy throw error', async () => {
        const { sut, addBookRepositorySpy } = makeSut()
        jest.spyOn(addBookRepositorySpy, 'add').mockImplementationOnce(() => { throw new Error() })
        const promise = sut.add(bookParams().body)
        await expect(promise).rejects.toThrowError()
    })
})