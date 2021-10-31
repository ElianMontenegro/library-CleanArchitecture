import { AddBook } from "@/domain/usecases"
import { badRequest, noContent, serverError } from "../helpers"
import { Controller, HttpResponse, Validation } from "../protocols"


export class AddBookController implements Controller{
    constructor(
        private readonly validation : Validation,
        private readonly addBook : AddBook
    ){}
    async handle(httpRequest: AddBookController.httpRequest): Promise<HttpResponse>{
        try {
            const error = this.validation.validate(httpRequest.body)
            if(error){
                return badRequest(error)
            }
            await this.addBook.add(httpRequest.body)
            return noContent()
        } catch (error : any) {
            return serverError(error)
        }
    }

}

export namespace AddBookController {
    export type httpRequest = {
        body : {
            title : string
            autor : string
            category : string
            lenguage : string[]
            country : string
            isbn : string
            year : number
            numberPage : number
            editorial : string
        }
    }
}