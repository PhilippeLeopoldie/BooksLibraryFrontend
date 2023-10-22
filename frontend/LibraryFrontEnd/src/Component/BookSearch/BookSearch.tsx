import { useState } from "react"
import "./BookSearch.css"
import { BookListSearch } from "../BookListSearch/BookListSearch"

type BooksSearchCriteria = {
  search?:{
    title: string,
    author: string
  }
}

export const BookSearch = () => {
  const [searchCriteria, setSearchCriteria] = useState<BooksSearchCriteria>({
    
  })
  const [inputValue,setInputValue] = useState<string>("");
  
  return (
    <>
      <form className="searchForm"
      onSubmit={(e) => e.preventDefault()}
      >
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
      <BookListSearch searchCriteria={searchCriteria.search}/>
    </>
  )
}


