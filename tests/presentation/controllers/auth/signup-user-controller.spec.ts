import { badRequest, serverError } from '../../../../src/presentation/helpers'
import { Controller, HttpResponse, Validation } from '@/presentation/protocols'
import { ValidationSpy } from '../../../../tests/presentation/mocks'
import { SingupUserParams } from '../../../../tests/presentation/mocks'
import { MissingParamError } from '../../../../src/presentation/errors'
import faker from 'faker'

export class SignupUserController implements Controller{
    constructor (private readonly validation : Validation){}
    async handle(httpRequest: SignupUserController.Request): Promise<HttpResponse>{
        try {
            const { username, email, password, repeatPassword } = httpRequest
            const error = this.validation.validate(httpRequest)
            if(error){
                return badRequest(error)
            }

        } catch (error : any) {
            return serverError(error)
        }
    }
    
}

export namespace SignupUserController {
    export type Request = {
        username : string,
        email: string,
        password : string,
        repeatPassword : string
    }
}

const makeSut = () => {
    const validateSpy = new ValidationSpy()
    const sut = new SignupUserController(validateSpy)
    return {
        validateSpy,
        sut
    }
}


describe('SignupUserController', () => {
    test('Should return 400 if validation return error', async () => {
        const { sut, validateSpy } = makeSut()
        validateSpy.error = new MissingParamError(faker.random.word())
        const httpRequest = await sut.handle(SingupUserParams())
        expect(httpRequest).toEqual(badRequest(validateSpy.error))
    })
});
