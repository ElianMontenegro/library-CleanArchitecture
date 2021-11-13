import { AddBook } from "@/domain/usecases";
import { AddBookRepository, CheckBookByTitleRepository } from "../../protocols/db";
import { bookInputDTO } from '@/domain/DTOs'

export class AddBookUsecase implements AddBook{
    constructor(
        private readonly checkBookByTitleRepository : CheckBookByTitleRepository,
        private readonly addBookRepository : AddBookRepository
    ){}
    async add(data: bookInputDTO): Promise<Boolean>{
        const exist = await this.checkBookByTitleRepository.checkBookBytitle(data.title)
        let isValid = false
        if(!exist){
            isValid = await this.addBookRepository.add(data);
        }
        return isValid
    }
}