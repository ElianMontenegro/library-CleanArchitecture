import { Hasher } from '../../../src/data/protocols/criptography'
import faker from "faker"

export class HasherSpy implements Hasher{
    plaintext = faker.lorem.text()
    hashtext = faker.datatype.uuid()
    async hash(plaintext: string): Promise<string>{
        this.plaintext = plaintext
        return this.hashtext
    }
}