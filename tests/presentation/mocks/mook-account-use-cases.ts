import { accountInputDTO } from "@/domain/DTOs";
import { AddAccount, Authenticate, Autheticate } from "@/domain/usecases";



export class AddAccountSpy implements AddAccount{
    params : accountInputDTO
    result = true
    async add(params: accountInputDTO): Promise<Boolean>{
        this.params = params 
        return this.result
    }
}

export class AuthenticateSpy implements Authenticate{
    params : Autheticate.Params
    result = undefined
    async auth(params: Autheticate.Params): Promise<Autheticate.Result>{
        this.params = params
        return this.result
    }
    
}