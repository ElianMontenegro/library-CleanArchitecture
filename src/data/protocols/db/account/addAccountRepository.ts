export interface AddAccountRepository {
    add: (user: AddAccountRepository.Params) => Promise<Boolean>
}

export namespace AddAccountRepository {
    export type Params = {
        username: string,
        email: string,
        password: string
    }
}