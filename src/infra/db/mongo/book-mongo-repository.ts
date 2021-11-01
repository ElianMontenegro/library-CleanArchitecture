import { mongoHelper } from './mongo-helper'
import { CheckBookByTitleRepository, AddBookRepository } from "@/data/protocols/db";
import { book } from "@/domain/DTOs";
import { Collection } from 'mongodb';


export class BookMongoRepository implements 
    CheckBookByTitleRepository,
    AddBookRepository{
    
    accountCollection : Collection
    makeCollection = () =>{
        this.accountCollection = mongoHelper.getCollection('book')
        return  this.accountCollection
    }

    async add(book: book): Promise<boolean>{
        const addBook = await this.makeCollection().insertOne(book)
        return addBook.insertedId !== null
    }

    async checkBookBytitle(title: string): Promise<Boolean>{
        const book = await this.makeCollection().findOne({ title : title})
        return book !== null
    }
    
}