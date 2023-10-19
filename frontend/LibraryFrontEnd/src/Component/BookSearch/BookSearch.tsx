import { useState } from "react"
import { BookList } from "../BookList/BookList"

type BooksSearchCriteria = {
  search?:{
    title: string,
    author: string
  }
}

export const BookSearch = () => {
  const [searchCriteria, setSearchCriteria] = useState<BooksSearchCriteria>({
    search:{
      title: "",
      author: ""
    }
  })
  const [inputValue,setInputValue] = useState<string>("");
  
  return (
    <>
      <form className="searchForm">
        <input
          className="searchForm__input"
          autoFocus
          placeholder="Search by Title or Author"
          name="titleOrAuthor"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            setSearchCriteria({
               search:{
                title:e.target.value,
                author: e.target.value
              }
            })
          }}
        />
      </form>
      <BookList searchCriteria={searchCriteria.search}/>
    </>
  )
}


