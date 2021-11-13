export interface Authenticate {
    auth: (params : Autheticate.Params) => Promise<Autheticate.Result>
}

export namespace Autheticate{
    export type Params = {
        email : string,
        password : string
    }

    export type Result = {
        accessToken : string,
        refreshToken : string
    }
}