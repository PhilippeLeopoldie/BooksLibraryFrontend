export type BookType = {
    bookId : number

    title :string
    author :string

    userId :number
    borrowed:boolean
    borrowedTime: Date
    bivenBack :boolean
    bivenBackTime:Date

}

export type OpinionType = {
    opinionId : number
    like : boolean
    bookId : number
    view:string
    userName:string
    userId : number
}



