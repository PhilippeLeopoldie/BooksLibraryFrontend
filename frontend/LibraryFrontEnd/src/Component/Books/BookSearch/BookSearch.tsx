import { FormEvent, useContext, useState } from "react";
import "./BookSearch.css";
import { BookSearchList } from "./BookSearchList/BookSearchList";
import { ThemeContext } from "../../App/App";

type BooksSearchCriteria = {
  titleOrAuthor: string;
};

export const BookSearch = () => {
  const theme = useContext(ThemeContext);
  const [searchCriteria, setSearchCriteria] = useState<string>("");
  const rootElement = document.documentElement;

  const handleSearch = (e : FormEvent) => {
    e.preventDefault();
    const inputField = document.activeElement as HTMLElement;

    // remove focus from text input
    if(inputField){ inputField.blur() };  
  }

  return (
    <>
      <form
        className={"search-form--" + theme}
        onSubmit={handleSearch}
      >
        <script>
          {theme === "black"
            ? (rootElement.style.backgroundColor = "#000000")
            : (rootElement.style.backgroundColor = "#f3f3f4")}
        </script>
        <input
          className="search-form__input"
          autoFocus
          placeholder="Search by Title or Author"
          name="titleOrAuthor"
          value={searchCriteria}
          onChange={(e) => {
            setSearchCriteria(e.target.value.toLowerCase());
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") e.preventDefault();
          }}
        />
        <BookSearchList titleOrAuthor={searchCriteria} />
      </form>
    </>
  );
};
