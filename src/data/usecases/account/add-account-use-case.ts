import { CheckAccountByEmailRepository, AddAccountRepository } from "@/data/protocols/db/account";
import { Hasher } from "@/data/protocols/criptography";
import { accountInputDTO } from "@/domain/DTOs";
import { AddAccount } from "@/domain/usecases/account";

export class AddAccountUseCase implements AddAccount{
    constructor (
        private readonly checkAccountByEmailRepository : CheckAccountByEmailRepository,
        private readonly hasher : Hasher,
        private readonly addAccountRepository : AddAccountRepository
    ) {}
    async add(user: accountInputDTO): Promise<Boolean>{
        const account = await this.checkAccountByEmailRepository.checkAccountByEmail(user.email)
        let isSaved : Boolean = false
        if(!account){
            const passwordHash = await this.hasher.hash(user.password);
            isSaved = await this.addAccountRepository.add({... user, password :  passwordHash})
            return isSaved
        }
        return isSaved
    }
}