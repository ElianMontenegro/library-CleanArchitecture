import faker from "faker"


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