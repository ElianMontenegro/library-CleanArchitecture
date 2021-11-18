import { CheckAccountByEmailRepository, AddAccountRepository } from "../../../src/data/protocols/db/account";


export class CheckAccountByEmailRepositorySpy implements CheckAccountByEmailRepository {
    email : string
    result = true
    async checkAccountByEmail(email: string): Promise<Boolean>{
        this.email = email
        return this.result
    }
}
export class AddAccountRepositorySpy implements AddAccountRepository{
    user :  AddAccountRepository.Params;
    result = true
    async add(user: AddAccountRepository.Params): Promise<Boolean>{
        this.user = user
        return this.result
    }
}