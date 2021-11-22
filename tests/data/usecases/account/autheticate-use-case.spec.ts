import { AutheticateParams } from '../../../presentation/mocks'
import { AuthenticateUseCase } from '../../../../src/data/usecases/account'
import { LoadAccountByEmailRepositorySpy } from '../../mock/mock-db-account'

const makeSut = () => {
    const loadAccountByEmailRepositorySpy = new LoadAccountByEmailRepositorySpy()
    const sut = new AuthenticateUseCase(loadAccountByEmailRepositorySpy)
    return {
        loadAccountByEmailRepositorySpy,
        sut
    }
}

describe('Authenticate use case', () => {
    test('Should return null if account is not found', async () => {
        const { sut } = makeSut()
        const response = await sut.auth(AutheticateParams())
        expect(response).toBe(null)
    })

    
})