import { book } from "@/domain/DTOs";

export interface AddBookRepository{
    add: (book : book) => Promise<AddBookRepository.Result>
}

export namespace AddBookRepository{
    export type Result = boolean
}