import { 
    Hasher, 
    HashCompare, 
    JWTGenerator
} from '../../../src/data/protocols/criptography'
import faker from "faker"

export class HasherSpy implements Hasher{
    plaintext = faker.lorem.text()
    hashtext = faker.datatype.uuid()
    async hash(plaintext: string): Promise<string>{
        this.plaintext = plaintext
        return this.hashtext
    }
}

export class HashCompareSpy implements HashCompare{
    plaintText : string
    hashText : string
    result = true
    async compare(plainText: string, hashText: string):  Promise<Boolean>{
        this.plaintText = plainText
        this.hashText = hashText
        return this.result
    }
}


export class JwtAdapterSpy implements JWTGenerator{
    id : string
    email : string
    AccessToken = faker.datatype.uuid()
    RefreshToken = faker.datatype.uuid()
    sign(id: string, email?: string, secret?: string, expiresIn?: any): string{
        this.id = id
        return this.AccessToken
    }
}