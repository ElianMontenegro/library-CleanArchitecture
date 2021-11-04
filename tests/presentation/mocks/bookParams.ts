import faker from "faker"


export const bookParams = () => {
    return {
        body : {
            title : faker.name.title(),
            autor : faker.name.firstName(),
            categoryId : faker.name.jobArea(),
            language : [ faker.random.word() ],
            countryId : faker.address.county(),
            isbn : faker.datatype.uuid(),
            year : faker.datatype.number(4),
            numberPage : faker.datatype.number(3),
            editorial : faker.name.jobArea()
        }
    }
}