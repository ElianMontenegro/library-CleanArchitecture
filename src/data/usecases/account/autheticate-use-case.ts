import { Authenticate } from "@/domain/usecases/account";
import { LoadAccountByEmailRepository  } from '@/data/protocols/db/account'
import { HashCompare, JWTGenerator } from '@/data/protocols/criptography'
import { config as dotenv } from 'dotenv'
dotenv()

export class AuthenticateUseCase implements Authenticate{
    constructor(
        private readonly loadAccountByEmailRepository : LoadAccountByEmailRepository,
        private readonly hashCompare : HashCompare,
        private readonly jwtAdapter : JWTGenerator
    ){}
    async auth(params: Authenticate.Params):  Promise<Authenticate.Result>{
        const account = await this.loadAccountByEmailRepository.load(params.email);
        if(account){
            const isValid = await this.hashCompare.compare(params.password, account.password)
            if(isValid){
                return {
                    accessToken : this.jwtAdapter.sign(account.id, undefined , process.env.ACCESS_TOKEN, 3600),
                    refreshToken: this.jwtAdapter.sign(account.id, params.email, process.env.REFRESH_TOKEN, 7600)
                }
            }
        }
        return null
    }

}

