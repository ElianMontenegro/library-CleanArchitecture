import { badRequest, serverError, forbidden, Unauthorized, ok } from '../../../../src/presentation/helpers'
import { ValidationSpy, AddAccountSpy, SingupUserParams, AuthenticateSpy } from '../../../../tests/presentation/mocks'
import { MissingParamError, DataInUseError, InvalidParamError } from '../../../../src/presentation/errors'
import { UnauthorizedError } from '../../../../src/presentation/errors'
import { SignupUserController } from '../../../../src/presentation/controllers'
import faker from 'faker'

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
