import { accountInputDTO } from '@/domain/DTOs'
export interface AddAccount {
    add: (user: accountInputDTO) => Promise<Boolean>
}

