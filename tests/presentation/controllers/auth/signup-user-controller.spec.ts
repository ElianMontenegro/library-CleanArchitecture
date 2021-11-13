import { badRequest, serverError, forbidden } from '../../../../src/presentation/helpers'
import { Controller, HttpResponse, Validation } from '@/presentation/protocols'
import { ValidationSpy, AddAccountSpy, SingupUserParams } from '../../../../tests/presentation/mocks'
import { MissingParamError, DataInUseError } from '../../../../src/presentation/errors'
import { AddAccount } from '@/domain/usecases'
import faker from 'faker'


export class SignupUserController implements Controller{
    constructor (
        private readonly validation : Validation,
        private readonly addAccount : AddAccount
    ){}
    async handle(httpRequest: SignupUserController.Request): Promise<HttpResponse>{
        try {
    
            const error = this.validation.validate(httpRequest)
            if(error){
                return badRequest(error)
            }
            const isValid = await this.addAccount.add(httpRequest)
            if(!isValid){
                return forbidden(new DataInUseError('email'))
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
    const addAccountSpy = new AddAccountSpy()
    const validateSpy = new ValidationSpy()
    const sut = new SignupUserController(validateSpy, addAccountSpy)
    return {
        validateSpy,
        addAccountSpy,
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

    test('Should return 403 if addAccount return false', async () => {
        const { sut, addAccountSpy } = makeSut()
        addAccountSpy.result = false
        const httpRequest = await sut.handle(SingupUserParams())
        expect(httpRequest).toEqual(forbidden(new DataInUseError('email')))
    })
});
