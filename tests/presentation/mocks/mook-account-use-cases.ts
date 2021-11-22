import { accountInputDTO } from "@/domain/DTOs";
import { AddAccount, Authenticate } from "@/domain/usecases/account";
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
    params : Authenticate.Params
    result = {
        accessToken: faker.datatype.uuid(),
        refreshToken: faker.datatype.uuid()
    }
    async auth(params: Authenticate.Params): Promise<Authenticate.Result>{
        this.params = params
        return this.result
    }
}