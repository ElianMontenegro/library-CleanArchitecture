import faker from 'faker'
import { Controller, HttpResponse, HttpRequest , Validation } from '../../../src/presentation/protocols'
import { badRequest } from '../../../src/presentation/helpers'
import { MissingParamError } from '../../../src/presentation/errors'
import { ValidationSpy } from '../mocks/mock-validation'
class AddBookController implements Controller{
    constructor(
        private readonly validation : Validation
    ){}
    async handle(httpRequest: HttpRequest): Promise<HttpResponse | any>{
        try {
            const error = this.validation.validate(httpRequest)
            if(error){
                return badRequest(error)
            }
        } catch (error) {
            console.log(error);
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
    const validateSpy = new ValidationSpy()
    const sut = new AddBookController(validateSpy)
    return {
        sut,
        requestParams,
        validateSpy
    }
}

describe('AddBookController', () => {
    test('Should call Validation with correct values', async () => {
        const { sut, requestParams, validateSpy} = makeSut()
        await sut.handle(requestParams)
        expect(validateSpy.input).toEqual(requestParams)
    })
})