export interface CheckBookByTitleRepository {
    checkBookBytitle: (title : string) => Promise<Boolean>
}