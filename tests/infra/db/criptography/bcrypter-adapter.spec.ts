import { BcrypterAdapter } from "../../../../src/infra/db/criptography"
import bcrypt from 'bcrypt'

jest.mock('bcrypt', () => ({
    async hash(): Promise<string> {
        return 'hash'
    },
    async compare(): Promise<Boolean>{
        return true
    }
}))
const salt = 10
const makeSut = () => {
    return new BcrypterAdapter(salt)
}

describe('bcrypterAdapter', () => {
    describe('hash', () => {
        test('Should return a valid hash on hash success', async () => {
            const sut = makeSut()
            const hash = await sut.hash('any_value')
            expect(hash).toBe('hash')
        })

        test('Should call hash with correct params', async () => {
            const sut = makeSut()
            const hashSpy = jest.spyOn(bcrypt, 'hash')
            await sut.hash('any_value')
            expect(hashSpy).toBeCalledWith('any_value', 10)
        })

        test('Should throw error if hash throw error', async () => {
            const sut = makeSut()
            jest.spyOn(bcrypt, 'hash').mockImplementationOnce(() => { throw Error() })
            const promise =  sut.hash('any_value')
            await expect(promise).rejects.toThrow()
        })
    })  

    describe('compare', () => {
        test('Should return true if compare success', async () => {
            const sut = makeSut()
            const isValid = await sut.compare('any_plaintText', 'any_hashText')
            expect(isValid).toBe(true)
        })
    })
})