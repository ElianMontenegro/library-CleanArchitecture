import faker from "faker";
import { 
    CheckAccountByEmailRepository, 
    AddAccountRepository,
    LoadAccountByEmailRepository
} from "../../../src/data/protocols/db/account";


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

export class LoadAccountByEmailRepositorySpy implements LoadAccountByEmailRepository{
    email : string
    result = {
        id: faker.datatype.uuid(),
        username: faker.name.findName(),
        password: faker.internet.password()
    }
    async load(email: string): Promise<LoadAccountByEmailRepository.Result>{
        this.email = email
        return this.result
    }
    
}