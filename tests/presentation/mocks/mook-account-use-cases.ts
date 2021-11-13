import { accountInputDTO } from "@/domain/DTOs";
import { AddAccount, Authenticate, Autheticate } from "@/domain/usecases";
import faker from "faker";



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
    result = {
        accessToken: faker.datatype.uuid(),
        refreshToken: faker.datatype.uuid()
    }
    async auth(params: Autheticate.Params): Promise<Autheticate.Result>{
        this.params = params
        return this.result
    }
}