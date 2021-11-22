import { AutheticateParams } from '../../../presentation/mocks'
import { AuthenticateUseCase } from '../../../../src/data/usecases/account'
import { LoadAccountByEmailRepositorySpy } from '../../mock/mock-db-account'
import { HashCompareSpy, JwtAdapterSpy } from '../../mock/mock-criptography'


const makeSut = () => {
    const jwtAdapterSpy = new JwtAdapterSpy()
    const hashCompareSpy = new HashCompareSpy()
    const loadAccountByEmailRepositorySpy = new LoadAccountByEmailRepositorySpy()
    const sut = new AuthenticateUseCase(
        loadAccountByEmailRepositorySpy,
        hashCompareSpy,
        jwtAdapterSpy,
        jwtAdapterSpy
    )
    return {
        loadAccountByEmailRepositorySpy,
        hashCompareSpy,
        jwtAdapterSpy,
        sut
    }
}

describe('Authenticate use case', () => {
    test('Should return null if account is not found', async () => {
        const { sut, loadAccountByEmailRepositorySpy } = makeSut()
        loadAccountByEmailRepositorySpy.result = null
        const response = await sut.auth(AutheticateParams())
        expect(response).toBeNull()
    })

    test('Should call loadAccountByEmailRepositorySpy with correct param', async () => {
        const { sut, loadAccountByEmailRepositorySpy } = makeSut()
        const autheticateParams = AutheticateParams()
        await sut.auth(autheticateParams)
        expect(loadAccountByEmailRepositorySpy.email).toBe(autheticateParams.email)
    })

    test('Should throw if loadAccountByEmailRepositorySpy throw', async () => {
        const { sut, loadAccountByEmailRepositorySpy } = makeSut()
        jest.spyOn(loadAccountByEmailRepositorySpy, 'load').mockImplementationOnce(() => { throw Error() })
        const promise = sut.auth(AutheticateParams())
        await expect(promise).rejects.toThrow()
    })

    test('Should return null if hashCompareSpy return false', async () => {
        const { sut, hashCompareSpy } = makeSut()
        hashCompareSpy.result = false
        const response = await sut.auth(AutheticateParams())
        expect(response).toBeNull()
    })

    test('Should throw if hashCompareSpy throw', async () => {
        const { sut, hashCompareSpy } = makeSut()
        jest.spyOn(hashCompareSpy, 'compare').mockImplementationOnce(() => { throw Error() })
        const promise = sut.auth(AutheticateParams())
        await expect(promise).rejects.toThrow()
    })

    test('Should return null if hashCompareSpy return false', async () => {
        const { sut, hashCompareSpy } = makeSut()
        hashCompareSpy.result = false
        const response = await sut.auth(AutheticateParams())
        expect(response).toBeNull()
    })

    test('Should call jwtAdapterSpy with correct params', async () => {
        const { sut, jwtAdapterSpy, loadAccountByEmailRepositorySpy } = makeSut()
        const authenticationParams = AutheticateParams()
        await sut.auth(authenticationParams)
        expect(jwtAdapterSpy.email).toBe(authenticationParams.email)
        expect(jwtAdapterSpy.id).toBe(loadAccountByEmailRepositorySpy.result.id)
    })
})