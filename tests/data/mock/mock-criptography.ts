import { Hasher, HashCompare } from '../../../src/data/protocols/criptography'
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