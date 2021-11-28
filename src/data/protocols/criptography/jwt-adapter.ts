export interface JWTGenerator {
    sign: (id : string, email?: string, secret? : string, expiresIn? : any) => string
}