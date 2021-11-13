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
            const { username, email, password,  repeatPassword } = httpRequest
            const error = this.validation.validate(httpRequest)
            if(error){
                return badRequest(error)
            }
            const isValid = await this.addAccount.add({username, email, password})
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

    test('Should call AddAccount with correct params', async () => {
        const { sut, addAccountSpy } = makeSut()
        const signupUserParams = SingupUserParams()
        await sut.handle(signupUserParams)
        expect(addAccountSpy.params).toEqual({
            username: signupUserParams.username,
            email: signupUserParams.email,
            password: signupUserParams.password
        })
    })

    test('Should return 500 if AddAccount throws error', async () => {
        const { sut, addAccountSpy } = makeSut()
        jest.spyOn(addAccountSpy, 'add').mockImplementationOnce(() => { throw new Error()})
        const httpResponse = await sut.handle(SingupUserParams())
        expect(httpResponse).toEqual(serverError(new Error()))
    })
});
