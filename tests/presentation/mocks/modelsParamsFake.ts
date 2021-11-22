import faker from "faker"
import { SignupUserController } from "../../../src/presentation/controllers"

export const bookParams = () => {
    return {
        body : {
            title : faker.name.title(),
            autor : faker.name.firstName(),
            categoryId : faker.datatype.uuid(),
            language : [ faker.datatype.uuid() ],
            countryId : faker.datatype.uuid(),
            isbn : faker.datatype.uuid(),
            year : faker.datatype.number() ,
            numberPage : faker.datatype.number(),
            editorial : faker.name.jobArea()
        }
    }
}

export const SingupUserParams = (): SignupUserController.Request  => (
    {
        username : faker.name.firstName(),
        email : faker.internet.email(),
        password : 'password_Any',
        repeatPassword : 'password_Any'
    }
)

export const AccountParams = () => (
    {
        username : faker.name.firstName(),
        email : faker.internet.email(),
        password : faker.datatype.uuid(),
        role : 'user'
    }
)

export const AutheticateParams = () => (
    {
        email : faker.internet.email(),
        password : faker.datatype.uuid()
    }
)