import { accountInputDTO } from "@/domain/DTOs";
import { AddAccount } from "@/domain/usecases";



export class AddAccountSpy implements AddAccount{
    user : accountInputDTO
    result = true
    async add(user: accountInputDTO): Promise<Boolean>{
        this.user = user 
        return this.result
    }
}