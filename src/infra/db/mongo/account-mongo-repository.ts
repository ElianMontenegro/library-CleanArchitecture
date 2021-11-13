import { CheckAccountByEmailRepository } from '@/data/protocols/db/account'
import { mongoHelper } from '@/infra/db/mongo'
import { Collection } from 'mongodb'

export class AccountMongoRepository implements CheckAccountByEmailRepository {

    accountCollection : Collection
    makeCollection = () =>{
        this.accountCollection = mongoHelper.getCollection('account')
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

}