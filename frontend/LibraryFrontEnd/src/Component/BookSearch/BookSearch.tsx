import { useContext, useState } from "react";
import "./BookSearch.css";
import { BookListSearch } from "../BookListSearch/BookListSearch";
import { ThemeContext } from "../App/App";

type BooksSearchCriteria = {
  titleOrAuthor: string;
};

export const BookSearch = () => {
  const theme = useContext(ThemeContext);
  const [searchCriteria, setSearchCriteria] = useState<string>("");
  const [inputValue, setInputValue] = useState<string>("");
  const rootElement = document.documentElement;

  return (
    <>
      <form className={"searchForm--"+theme} onSubmit={(e) => e.preventDefault()}>
        <script>
          {theme ==="black" ? rootElement.style.backgroundColor='#000000': rootElement.style.backgroundColor='#f3f3f4'}
        </script>
        <input
          className="searchForm__input"
          autoFocus
          placeholder="Search by Title or Author"
          name="titleOrAuthor"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            setSearchCriteria(
              e.target.value,
            );
          }}
        />
        <BookListSearch titleOrAuthor={searchCriteria} />
      </form>
      
      
    </>
  );
};
