import { AddAccountUseCase } from "../../../src/data/usecases/account"
import faker from "faker"
import { CheckAccountByEmailRepositorySpy } from "../mock/mock-db-account"

const makeSut = () => {
    const userFake = {
        username : faker.internet.userName(),
        email : faker.internet.email(),
        password : faker.internet.password()
    }
    const checkAccountByEmailRepositorySpy = new CheckAccountByEmailRepositorySpy()
    const sut = new AddAccountUseCase(
        checkAccountByEmailRepositorySpy
    )
    return {
        userFake,
        checkAccountByEmailRepositorySpy,
        sut
    }
}

describe('AddAccount usecases', () => {
    test('Should return null if user is not found', async () => {
        const { sut, userFake, checkAccountByEmailRepositorySpy } = makeSut()
        checkAccountByEmailRepositorySpy.result = false
        const response = await sut.add(userFake)
        expect(response).toEqual(null)
    })
})