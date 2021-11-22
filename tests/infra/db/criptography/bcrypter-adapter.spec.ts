import { BcrypterAdapter } from "../../../../src/infra/db/criptography"

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
    })  
})