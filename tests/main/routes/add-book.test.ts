import { Collection } from 'mongodb';
import request from 'supertest'
import { mongoHelper } from "../../../src/infra/db/mongo";
import app from '../../../src/main/config/app'
import { bookParams} from '../../presentation/mocks'

let bookCollection : Collection

describe('Book Route', () => {
    beforeAll(async () => {
        await mongoHelper.connect(process.env.MONGO_URL)
    })

    beforeEach(async() => {
        bookCollection = mongoHelper.getCollection('book')
        await bookCollection.deleteMany({})
    })

    afterAll(async () => {
        await mongoHelper.disconnect()
    })
    
    describe('addBook', () => {
        test('Should retrun 204 if book was added successfully', async () => {
            await request(app)
                .post('/api/add-book')
                .send(bookParams().body)
                .expect(204)
        })

        test('Should retrun 400 if params was wrong', async () => {
            await request(app)
                .post('/api/add-book')
                .send({})
                .expect(400)
        })

        test('Should retrun 400 if title is used', async () => {
            const params = bookParams().body
            bookCollection.insertOne(params)
            await request(app)
                .post('/api/add-book')
                .send(params)
                .expect(400)
        })

    })
})