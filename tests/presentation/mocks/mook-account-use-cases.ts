import { accountInputDTO } from "@/domain/DTOs";
import { AddAccount } from "@/domain/usecases";



export class AddAccountSpy implements AddAccount{
    params : accountInputDTO
    result = true
    async add(params: accountInputDTO): Promise<Boolean>{
        this.params = params 
        return this.result
    }
}