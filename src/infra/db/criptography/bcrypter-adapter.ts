import { HashCompare, Hasher } from "@/data/protocols/criptography";
import bcrypt from 'bcrypt'
export class BcrypterAdapter implements Hasher, HashCompare{
    constructor(private readonly salt : number){}

    async hash(plaintext: string): Promise<string>{
        return await bcrypt.hash(plaintext, this.salt)
    }

    async compare(plainText: string, hashText: string): Promise<Boolean>{
        return await bcrypt.compare(plainText, hashText)
    }
}