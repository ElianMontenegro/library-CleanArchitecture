import { CheckAccountByEmailRepository, AddAccountRepository, LoadAccountByEmailRepository } from '@/data/protocols/db/account'
import { mongoHelper } from '@/infra/db/mongo'
import { Collection } from 'mongodb'

export class AccountMongoRepository implements 
    CheckAccountByEmailRepository,
    AddAccountRepository,
    LoadAccountByEmailRepository {
  
    accountCollection : Collection
    makeCollection = () =>{
        this.accountCollection = mongoHelper.getCollection('user')
        return  this.accountCollection
    }

    async checkAccountByEmail (email: string): Promise<Boolean>{
        const account = await this.makeCollection().findOne({
            email
        },{
            projection: {
                _id: 1
            }
        })
        return account !== null
    }

    async add(user: AddAccountRepository.Params): Promise<Boolean>{
        const isSave = await this.makeCollection().insertOne({...user, role : "user"})
        return isSave.insertedId !== null
    }

    async load(email: string): Promise<LoadAccountByEmailRepository.Result>{
        const account = await this.makeCollection().findOne({
            email
        },{
            projection: {
                _id : 1,
                username : 1,
                password : 1
            }
        })
        if(account){
            return {
                id : account._id,
                username : account.username,
                password : account.password
            }
        }
    }

}