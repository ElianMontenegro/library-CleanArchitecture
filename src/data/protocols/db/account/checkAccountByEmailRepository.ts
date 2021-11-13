export interface CheckAccountByEmailRepository {
    checkAccountByEmail: (email : string) => Promise<Boolean>
}
