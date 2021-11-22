import { bookInputDTO } from '../../DTOs'
export interface AddBook {
    add : (data : bookInputDTO) => Promise<Boolean>
}
