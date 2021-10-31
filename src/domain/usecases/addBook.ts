import { book } from '../DTOs'
export interface AddBook {
    add : (data : AddBook.Params) => Promise<void>
}

export namespace AddBook {
    export type Params = book
}