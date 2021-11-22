import { Authenticate } from "@/domain/usecases/account";
import { LoadAccountByEmailRepository  } from '@/data/protocols/db/account'
import { AccessToken, HashCompare, RefreshToken } from '@/data/protocols/criptography'

export class AuthenticateUseCase implements Authenticate{
    constructor(
        private readonly loadAccountByEmailRepository : LoadAccountByEmailRepository,
        private readonly hashCompare : HashCompare,
        private readonly accessToken : AccessToken,
        private readonly refreshToken : RefreshToken
    ){}
    async auth(params: Authenticate.Params):  Promise<Authenticate.Result>{
        const account = await this.loadAccountByEmailRepository.load(params.email);
        if(account){
            const isValid = await this.hashCompare.compare(params.password, account.password)
            if(isValid){
                return {
                    accessToken : await this.accessToken.accessToken(account.id, process.env.ACCESS_TOKEN, 3600),
                    refreshToken: await this.refreshToken.refreshToken(account.id, params.email, process.env.REFRESH_TOKEN, 7600)
                }
            }
        }
        return null
    }

}