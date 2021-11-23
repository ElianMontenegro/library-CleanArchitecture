import { JWTGenerator, JWTAdapter } from '../../../../src/infra/db/criptography'

jest.mock('jsonwebtoken', () => ({
    sign(params : JWTGenerator.Params){
        return 'token'
    }
}))

const makeSut = () => {
    return new JWTAdapter()
}

describe('JWTAdapter', () => {
    describe('sign accessToken', () => {
        test('Should return a access token if on sign success', async () => {
            const sut = makeSut()
            const token = sut.sign({id : 'any_id', secret : 'any_secret', expiresIn : 'any_expiresIn'})
            expect(token).toBe('token')
        })
    })
})