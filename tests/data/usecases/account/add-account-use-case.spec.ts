import { AddAccountUseCase } from "../../../../src/data/usecases/account"
import faker from "faker"
import { CheckAccountByEmailRepositorySpy, AddAccountRepositorySpy } from "../../mock/mock-db-account"
import { HasherSpy } from "../../mock/mock-criptography"

const makeSut = () => {
    const userFake = {
        username : faker.internet.userName(),
        email : faker.internet.email(),
        password : faker.internet.password()
    }
    const addAccountRepositorySpy = new AddAccountRepositorySpy()
    const hasherSpy = new HasherSpy
    const checkAccountByEmailRepositorySpy = new CheckAccountByEmailRepositorySpy()
    const sut = new AddAccountUseCase(
        checkAccountByEmailRepositorySpy,
        hasherSpy,
        addAccountRepositorySpy
    )
    return {
        userFake,
        checkAccountByEmailRepositorySpy,
        hasherSpy,
        addAccountRepositorySpy,
        sut
    }
}

describe('AddAccount usecases', () => {
    test('Should return false if user is not found', async () => {
        const { sut, userFake, checkAccountByEmailRepositorySpy } = makeSut()
        checkAccountByEmailRepositorySpy.result = true
        const response = await sut.add(userFake)
        expect(response).toEqual(false)
    })

    test('Should call hasherSpy with correct plaintext', async () => {
        const { sut, userFake, hasherSpy } = makeSut()
        const fake = userFake
        await sut.add(fake)
        expect(hasherSpy.plaintext).toEqual(fake.password)
    })

    test('Should throw error if hasherSpy throw error', async () => {
        const { sut, userFake, hasherSpy } = makeSut()
        jest.spyOn(hasherSpy, 'hash').mockImplementationOnce(() => { throw new Error() })
        const promise = sut.add(userFake)
        await expect(promise).rejects.toThrowError()
    })

    test('Should call addAccountRepositorySpy with correct params', async () => {
        const { sut, userFake, addAccountRepositorySpy, hasherSpy } = makeSut()
        userFake.password = hasherSpy.hashtext
        await sut.add(userFake)
        expect(addAccountRepositorySpy.user).toEqual(userFake)
    })
})