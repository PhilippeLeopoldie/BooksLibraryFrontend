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
    like : number
    bookId : number
    view:string
    userName:string
    
}

export type OpinionUpdateType = {
    bookId:number
}



