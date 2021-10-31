import faker from 'faker'
import { AddBook } from '../../../src/domain/usecases'
import { Controller, HttpResponse, HttpRequest , Validation } from '../../../src/presentation/protocols'
import { badRequest, noContent, serverError } from '../../../src/presentation/helpers'
import { ValidationSpy, AddBookSpy } from '../mocks/'
class AddBookController implements Controller{
    constructor(
        private readonly validation : Validation,
        private readonly addBook : AddBook
    ){}
    async handle(httpRequest: HttpRequest): Promise<HttpResponse | any>{
        try {
            const error = this.validation.validate(httpRequest.body)
            if(error){
                return badRequest(error)
            }
            await this.addBook.add(httpRequest.body)
            return noContent()
        } catch (error : any) {
            return serverError(error)
        }
    }

}

export namespace AddBookController {
    export type httpRequest = {
        body : {
            title : string
            autor : string
            category : string
            lenguage : string[]
            country : string
            isbn : string
            year : number
            numberPage : number
            editorial : string
        }
    }
}


const makeSut = () => {
    const requestParams = {
        body : {
            title : faker.name.title(),
            autor : faker.name.firstName(),
            category : faker.name.jobArea(),
            lenguage : [ faker.random.word() ],
            country : faker.address.county(),
            isbn : faker.datatype.uuid(),
            year : faker.datatype.number(4),
            numberPage : faker.datatype.number(3),
            editorial : faker.name.jobArea()
        }
    }
    const addBookSpy = new AddBookSpy()
    const validateSpy = new ValidationSpy()
    const sut = new AddBookController(validateSpy, addBookSpy)
    return {
        sut,
        requestParams,
        validateSpy,
        addBookSpy
    }
}

describe('AddBookController', () => {
    test('Should call Validation with correct values', async () => {
        const { sut, requestParams, validateSpy} = makeSut()
        await sut.handle(requestParams)
        expect(validateSpy.input).toEqual(requestParams.body)
    })

    test('Should return 400 if Validation fails', async () => {
        const { sut, requestParams, validateSpy} = makeSut()
        validateSpy.error = new Error()
        const httpRequest = await sut.handle(requestParams)
        expect(httpRequest).toEqual(badRequest(validateSpy.error))
    })

    test('Should call AddBook with correct values', async () => {
        const { sut, requestParams, addBookSpy} = makeSut()
        await sut.handle(requestParams)
        expect(addBookSpy.params).toEqual(requestParams.body)
    })

    test('Should return 500 if AddBook with throw error', async () => {
        const { sut, requestParams, addBookSpy} = makeSut()
        jest.spyOn(addBookSpy, 'add').mockImplementationOnce(() => { throw new Error() })
        const httpResponse = await sut.handle(requestParams)
        expect(httpResponse).toEqual(serverError(new Error()))
    }) 

    test('Should return 204 on success', async () => {
        const { sut, requestParams} = makeSut()
        const httpResponse = await sut.handle(requestParams)
        expect(httpResponse).toEqual(noContent())
    }) 
})