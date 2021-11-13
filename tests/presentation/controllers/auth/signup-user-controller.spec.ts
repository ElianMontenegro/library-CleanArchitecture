import { badRequest, serverError, forbidden, Unauthorized, ok } from '../../../../src/presentation/helpers'
import { Controller, HttpResponse, Validation } from '@/presentation/protocols'
import { ValidationSpy, AddAccountSpy, SingupUserParams, AuthenticateSpy } from '../../../../tests/presentation/mocks'
import { MissingParamError, DataInUseError, InvalidParamError } from '../../../../src/presentation/errors'
import { AddAccount, Authenticate } from '@/domain/usecases'
import faker from 'faker'
import { UnauthorizedError } from '../../../../src/presentation/errors'


export class SignupUserController implements Controller{
    constructor (
        private readonly validation : Validation,
        private readonly addAccount : AddAccount,
        private readonly authenticate : Authenticate
    ){}
    async handle(httpRequest: SignupUserController.Request): Promise<HttpResponse>{
        try {
            const { username, email, password,  repeatPassword } = httpRequest
            const error = this.validation.validate(httpRequest)
            if(error){
                return badRequest(error)
            }
            if(password !== repeatPassword){
                return badRequest(new InvalidParamError('repeatPassword'))
            }
            const isValid = await this.addAccount.add({username, email, password})
            if(!isValid){
                return forbidden(new DataInUseError('email'))
            }
            const Authenticated = await this.authenticate.auth({email, password})
            if(!Authenticated){
                return Unauthorized(new UnauthorizedError())
            }
            return ok(Authenticated)
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
    const authenticateSpy = new AuthenticateSpy()
    const addAccountSpy = new AddAccountSpy()
    const validateSpy = new ValidationSpy()
    const sut = new SignupUserController(
        validateSpy, 
        addAccountSpy, 
        authenticateSpy
    )
    return {
        validateSpy,
        addAccountSpy,
        authenticateSpy,
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

    test('Should return 400 passwords not match', async () => {
        const { sut } = makeSut()
        const paramsUser =  SingupUserParams()
        paramsUser.repeatPassword = 'different_password'
        const httpResponse = await sut.handle(paramsUser)
        expect(httpResponse).toEqual(badRequest(new InvalidParamError('repeatPassword')))
    })

    test('Should return 401 if authenticate return null', async () => {
        const { sut, authenticateSpy } = makeSut()
        authenticateSpy.result = null
        const httpResponse = await sut.handle(SingupUserParams())
        expect(httpResponse).toEqual(Unauthorized(new UnauthorizedError()))
    })

    test('Should call Authentication with correct values', async () => {
        const { sut, authenticateSpy} = makeSut()
        const paramsUser =  SingupUserParams()
        await sut.handle(paramsUser)
        expect(authenticateSpy.params).toEqual({
          email: paramsUser.email,
          password: paramsUser.password
        })
    })

    test('Should return 200 if valid data is provided', async () => {
        const { sut, authenticateSpy } = makeSut()
        const httpResponse = await sut.handle(SingupUserParams())
        expect(httpResponse).toEqual(ok(authenticateSpy.result))
    })

    test('Should return 500 if authenticateSpy throw error', async () => {
        const { sut, authenticateSpy } = makeSut()
        jest.spyOn(authenticateSpy, 'auth').mockImplementationOnce(() => { throw new Error() })
        const httpResponse = await sut.handle(SingupUserParams())
        expect(httpResponse).toEqual(serverError(new Error()))
    })
});
