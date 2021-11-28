import { JWTGenerator } from '@/data/protocols/criptography/jwt-adapter'
import jwt from 'jsonwebtoken'

export class JWTAdapter implements JWTGenerator {
    sign(id : string, email?: string, secret? : string, expiresIn? : any): string{
        return jwt.sign({ id : id, email : email }, secret, { expiresIn: expiresIn })
    }
}