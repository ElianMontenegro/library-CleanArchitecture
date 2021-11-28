import { makeAddAccount } from "../use-cases/add-account-usecase-factory"
import { makeAuthentication } from "../use-cases/autheticate-usecase-factory"
import { SignupUserController } from '../../../presentation/controllers'
import { makeSignupValidation } from '../controllers'

export const makeSignupController = (): SignupUserController => {
    return new SignupUserController(makeSignupValidation(), makeAddAccount(), makeAuthentication())
}