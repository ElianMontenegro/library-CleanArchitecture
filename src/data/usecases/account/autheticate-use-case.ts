import { Authenticate } from "@/domain/usecases/account";
import { LoadAccountByEmailRepository  } from '@/data/protocols/db/account'

export class AuthenticateUseCase implements Authenticate{
    constructor(
        private readonly loadAccountByEmailRepository : LoadAccountByEmailRepository
    ){}
    async auth(params: Authenticate.Params):  Promise<Authenticate.Result>{
        const account = await this.loadAccountByEmailRepository.load(params.email);
        if(account){}
        return null
    }

}