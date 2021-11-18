import { AddAccountUseCase } from "../../../src/data/usecases/account"
import faker from "faker"
import { CheckAccountByEmailRepositorySpy } from "../mock/mock-db-account"
import { HasherSpy } from "../mock/mock-criptography"

const makeSut = () => {
    const userFake = {
        username : faker.internet.userName(),
        email : faker.internet.email(),
        password : faker.internet.password()
    }
    const hasherSpy = new HasherSpy
    const checkAccountByEmailRepositorySpy = new CheckAccountByEmailRepositorySpy()
    const sut = new AddAccountUseCase(
        checkAccountByEmailRepositorySpy,
        hasherSpy
    )
    return {
        userFake,
        checkAccountByEmailRepositorySpy,
        hasherSpy,
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

    test('Should call hasherSpy with correct plaintext', async () => {
        const { sut, userFake, hasherSpy } = makeSut()
        await sut.add(userFake)
        expect(hasherSpy.plaintext).toEqual(userFake.password)
    })

})