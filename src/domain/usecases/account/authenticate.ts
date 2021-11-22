export interface Authenticate {
    auth: (params : Authenticate.Params) => Promise<Authenticate.Result>
}

export namespace Authenticate{
    export type Params = {
        email : string,
        password : string
    }

    export type Result = {
        accessToken : string,
        refreshToken : string
    }
}