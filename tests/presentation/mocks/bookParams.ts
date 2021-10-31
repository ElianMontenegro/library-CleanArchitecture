import faker from "faker"


export const bookParams = () => {
    return {
        body : {
            title : faker.name.title(),
            autor : faker.name.firstName(),
            category : faker.name.jobArea(),
            lenguage : [ faker.random.word() ],
            country : faker.address.county(),
            isbn : faker.datatype.uuid(),
            year : faker.datatype.number(4),
            numberPage : faker.datatype.number(3),
            editorial : faker.name.jobArea()
        }
    }
}