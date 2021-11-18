import { CheckAccountByEmailRepository } from "@/data/protocols/db/account";
import { Hasher } from "@/data/protocols/criptography";
import { accountInputDTO } from "@/domain/DTOs";
import { AddAccount } from "@/domain/usecases";

export class AddAccountUseCase implements AddAccount{
    constructor (
        private readonly checkAccountByEmailRepository : CheckAccountByEmailRepository,
        private readonly hasher : Hasher
    ) {}
    async add(user: accountInputDTO): Promise<Boolean>{
        const account = await this.checkAccountByEmailRepository.checkAccountByEmail(user.email)
        if(account){
            const passwordHash = this.hasher.hash(user.password);
            return true
        }
        return null
    }
}