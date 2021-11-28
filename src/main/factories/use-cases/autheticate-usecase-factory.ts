import { AuthenticateUseCase } from "../../../data/usecases/account"
import { JWTAdapter, BcrypterAdapter } from "../../../infra/db/criptography"
import { AccountMongoRepository } from "../../../infra/db/mongo"

export const makeAuthentication = (): AuthenticateUseCase => {
    const salt = 10;
    const bcrypterAdapter = new BcrypterAdapter(salt)
    const jwtAdapter = new JWTAdapter()
    const accountMongoRepository = new AccountMongoRepository()
    return new AuthenticateUseCase(accountMongoRepository, bcrypterAdapter, jwtAdapter)
}