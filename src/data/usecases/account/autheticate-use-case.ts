import { Authenticate } from "@/domain/usecases/account";
import { LoadAccountByEmailRepository  } from '@/data/protocols/db/account'
import { HashCompare } from '@/data/protocols/criptography'

export class AuthenticateUseCase implements Authenticate{
    constructor(
        private readonly loadAccountByEmailRepository : LoadAccountByEmailRepository,
        private readonly hashCompare : HashCompare
    ){}
    async auth(params: Authenticate.Params):  Promise<Authenticate.Result>{
        const account = await this.loadAccountByEmailRepository.load(params.email);
        if(account){
            const isValid = await this.hashCompare.compare(params.password, account.password)
            if(isValid){
                return {
                    accessToken : "",
                    refreshToken: ""
                }
            }
        }
        return null
    }

}