import { useContext, useState } from "react";
import "./BookSearch.css";
import { BookListSearch } from "../BookListSearch/BookListSearch";
import { ThemeContext } from "../App/App";

type BooksSearchCriteria = {
  search?: {
    title: string;
    author: string;
  };
};

export const BookSearch = () => {
  const theme = useContext(ThemeContext);
  const [searchCriteria, setSearchCriteria] = useState<BooksSearchCriteria>({});
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
            setSearchCriteria({
              search: {
                title: e.target.value,
                author: e.target.value,
              },
            });
          }}
        />
        <BookListSearch searchCriteria={searchCriteria.search} />
      </form>
      
      
    </>
  );
};
