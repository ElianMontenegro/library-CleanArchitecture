import { AddAccount, Authenticate } from "@/domain/usecases/account"
import { DataInUseError, InvalidParamError, UnauthorizedError } from "../errors"
import { badRequest, forbidden, ok, serverError, Unauthorized } from "../helpers"
import { Controller, HttpResponse, Validation } from "../protocols"


export class SignupUserController implements Controller{
    constructor (
        private readonly validation : Validation,
        private readonly addAccount : AddAccount,
        private readonly authenticate : Authenticate
    ){}
    async handle(httpRequest: SignupUserController.Request): Promise<HttpResponse>{
        try {
            const { username, email, password,  repeatPassword } = httpRequest
            const error = this.validation.validate(httpRequest)
            if(error){
                return badRequest(error)
            }
            if(password !== repeatPassword){
                return badRequest(new InvalidParamError('repeatPassword'))
            }
            const isValid = await this.addAccount.add({username, email, password})
            if(!isValid){
                return forbidden(new DataInUseError('email'))
            }
            const Authenticated = await this.authenticate.auth({email, password})
            if(!Authenticated){
                return Unauthorized(new UnauthorizedError())
            }
            return ok(Authenticated)
        } catch (error : any) {
            return serverError(error)
        }
    }
    
}

export namespace SignupUserController {
    export type Request = {
        username : string,
        email: string,
        password : string,
        repeatPassword : string
    }
}