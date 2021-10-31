import { book } from '../DTOs'
export interface AddBook {
    add : (data : AddBook.Params) => Promise<Boolean>
}

export namespace AddBook {
    export type Params = book
}