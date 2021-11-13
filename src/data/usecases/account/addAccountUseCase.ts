import { CheckAccountByEmailRepository } from "@/data/protocols/db/account";
import { accountInputDTO } from "@/domain/DTOs";
import { AddAccount } from "@/domain/usecases";

export class AddAccountUseCase implements AddAccount{
    constructor (
        private readonly checkAccountByEmailRepository : CheckAccountByEmailRepository
    ) {}
    async add(user: accountInputDTO): Promise<Boolean>{
        const account = await this.checkAccountByEmailRepository.checkAccountByEmail(user.email)
        if(account){
            return true
        }
        return null
    }
}