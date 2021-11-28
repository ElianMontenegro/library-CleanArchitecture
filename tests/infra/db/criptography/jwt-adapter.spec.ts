import { JWTAdapter } from '../../../../src/infra/db/criptography'
import { JWTGenerator } from '../../../../src/data/protocols/criptography/jwt-adapter'
import jwt from 'jsonwebtoken'
jest.mock('jsonwebtoken', () => ({
    sign(id : string, email?: string, secret? : string, expiresIn? : any){
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
            const token = sut.sign('any_id', undefined, 'any_secret', {expiresIn : 'any_expiresIn'})
            expect(token).toBe('token')
        })

        test('Should call sign with correct params', () => {
            const sut = makeSut()
            const signSpy = jest.spyOn(jwt, 'sign')
            sut.sign('any_id', undefined, 'any_secret', {expiresIn : 'any_expiresIn'})
            expect(signSpy).toBeCalledWith({"email": undefined, "id": "any_id"}, "any_secret", {"expiresIn": {"expiresIn": "any_expiresIn"}})
        })

    })

    describe('sign refresh token', () => {
        test('Should return a refresh token if on sign success', () => {
            const sut = makeSut()
            const token = sut.sign('any_id', 'any_email', 'any_secret', {expiresIn : 'any_expiresIn'})
            expect(token).toBe('token')
        })

        test('Should call sign with correct params', () => {
            const sut = makeSut()
            const signSpy = jest.spyOn(jwt, 'sign')
            sut.sign('any_id', 'any_email', 'any_secret', {expiresIn : 'any_expiresIn'})
            expect(signSpy).toBeCalledWith({"email": "any_email", "id": "any_id"}, "any_secret", {"expiresIn": {"expiresIn": "any_expiresIn"}})
        })
    })
})


