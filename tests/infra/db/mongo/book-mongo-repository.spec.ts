import { Collection } from 'mongodb'
import { mongoHelper, BookMongoRepository } from '../../../../src/infra/db/mongo'
import { bookParams } from '../../../presentation/mocks'
let bookCollection : Collection

const makeSut = () => {
    return new BookMongoRepository()
}


describe('bookMongoRepository', () => {

    beforeAll(async () => {
        await mongoHelper.connect(process.env.MONGO_URL!)
    })

    beforeEach(async () => {
        bookCollection = mongoHelper.getCollection('book')
        bookCollection.deleteMany({})
    })

    afterAll(async () => {
        await mongoHelper.disconnect()
    })

    describe('checkByTitle', () => {
        test('Should return false', async () =>{
            const sut =  makeSut()
            const exist = await sut.checkBookBytitle(bookParams().body.title)
            expect(exist).toBe(false)
        })

        
    })
})




