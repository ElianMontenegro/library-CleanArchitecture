import { CheckAccountByEmailRepository } from "../../../src/data/protocols/db/account";


export class CheckAccountByEmailRepositorySpy implements CheckAccountByEmailRepository{
    email : string
    result = true
    async checkAccountByEmail(email: string): Promise<Boolean>{
        this.email = email
        return this.result
    }

}