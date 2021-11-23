import { JWTGenerator, JWTAdapter } from '../../../../src/infra/db/criptography'
import jwt from 'jsonwebtoken'
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
        test('Should return a access token if on sign success', () => {
            const sut = makeSut()
            const token = sut.sign({id : 'any_id', secret : 'any_secret', expiresIn : 'any_expiresIn'})
            expect(token).toBe('token')
        })

        test('Should call sign with correct params', () => {
            const sut = makeSut()
            const signSpy = jest.spyOn(jwt, 'sign')
            sut.sign({id : 'any_id', secret : 'any_secret', expiresIn : 'any_expiresIn'})
            expect(signSpy).toBeCalledWith({id : 'any_id'}, 'any_secret', 'any_expiresIn')
        })

    })
})


