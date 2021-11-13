import { bookInputDTO } from "@/domain/DTOs";

export interface AddBookRepository{
    add: (book : bookInputDTO) => Promise<AddBookRepository.Result>
}

export namespace AddBookRepository{
    export type Result = boolean
}