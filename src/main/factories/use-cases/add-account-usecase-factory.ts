import { AddAccountUseCase } from "../../../data/usecases/account"
import { BcrypterAdapter } from "../../../infra/db/criptography"
import { AccountMongoRepository } from "../../../infra/db/mongo"

export const makeAddAccount = (): AddAccountUseCase => {
    const salt = 10
    const accountMongoRepository = new AccountMongoRepository()
    const bcrypterAdapter = new BcrypterAdapter(salt)
    return new AddAccountUseCase(accountMongoRepository, bcrypterAdapter, accountMongoRepository)
}