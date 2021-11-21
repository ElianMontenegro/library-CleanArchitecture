import { Collection } from 'mongodb'
import { mongoHelper, AccountMongoRepository } from '../../../../src/infra/db/mongo'
import { AccountParams } from '../../../presentation/mocks'
let accountCollection : Collection

const makeSut = () => {
    return new AccountMongoRepository()
}


describe('accountMongoRepository', () => {

    beforeAll(async () => {
        await mongoHelper.connect(process.env.MONGO_URL!)
    })

    beforeEach(async () => {
        accountCollection = mongoHelper.getCollection('user')
        await accountCollection.deleteMany({})
    })

    afterAll(async () => {
        await mongoHelper.disconnect()
    })

    describe('add', () => {
        test('Should return true if account was success create', async () => {
            const sut = makeSut()
            const isSaved = await sut.add(AccountParams())
            expect(isSaved).toBe(true)
        })
    })

    describe('checkAccountByEmail', () => {
        test('Should return true if account found', async () => {
            const sut = makeSut()
            const accountParams = AccountParams()
            await accountCollection.insertOne(accountParams)
            const isSaved = await sut.checkAccountByEmail(accountParams.email)
            expect(isSaved).toBe(true)
        })
    })

})