import { Hasher } from "@/data/protocols/criptography";
import bcrypt from 'bcrypt'
export class BcrypterAdapter implements Hasher{
    constructor(private readonly salt : number){}

    async hash(plaintext: string): Promise<string>{
        return await bcrypt.hash(plaintext, this.salt)
    }
}