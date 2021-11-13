import { badRequest, noContent, serverError } from '../../../src/presentation/helpers'
import { ValidationSpy, AddBookSpy } from '../mocks/'
import { AddBookController } from '../../../src/presentation/controllers' 
import { bookParams } from '../mocks/modelsParamsFake'


const makeSut = () => {
    const addBookSpy = new AddBookSpy()
    const validateSpy = new ValidationSpy()
    const sut = new AddBookController(validateSpy, addBookSpy)
    return {
        sut,
        validateSpy,
        addBookSpy
    }
}

describe('AddBookController', () => {
    test('Should call Validation with correct values', async () => {
        const { sut, validateSpy} = makeSut()
        const params  = bookParams()
        await sut.handle(params)
        expect(validateSpy.input).toEqual(params.body)
    })

    test('Should return 400 if Validation fails', async () => {
        const { sut, validateSpy} = makeSut()
        validateSpy.error = new Error()
        const httpRequest = await sut.handle(bookParams())
        expect(httpRequest).toEqual(badRequest(validateSpy.error))
    })

    test('Should call AddBook with correct values', async () => {
        const { sut, addBookSpy} = makeSut()
        const params  = bookParams()
        await sut.handle(params)
        expect(addBookSpy.params).toEqual(params.body)
    })

    test('Should return 500 if AddBook with throw error', async () => {
        const { sut, addBookSpy} = makeSut()
        jest.spyOn(addBookSpy, 'add').mockImplementationOnce(() => { throw new Error() })
        const httpResponse = await sut.handle(bookParams())
        expect(httpResponse).toEqual(serverError(new Error()))
    }) 

    test('Should return 400 if AddBook return false', async () => {
        const { sut, addBookSpy} = makeSut()
        addBookSpy.result = false
        const httpResponse = await sut.handle(bookParams())
        expect(httpResponse).toEqual(badRequest(new Error('the title already used')))
    })

    test('Should return 204 on success', async () => {
        const { sut } = makeSut()
        const httpResponse = await sut.handle(bookParams())
        expect(httpResponse).toEqual(noContent())
    }) 
})