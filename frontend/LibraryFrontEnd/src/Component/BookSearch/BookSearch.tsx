import { FormEvent, useContext, useState } from "react";
import "./BookSearch.css";
import { BookSearchList } from "./BookSearchList/BookSearchList";
import { ThemeContext } from "../../App/App";


export const BookSearch = () => {
  const theme = useContext(ThemeContext);
  const [searchCriteria, setSearchCriteria] = useState<string>("");

  const handleSearch = (e : FormEvent) => {
    e.preventDefault();
    const inputField = document.activeElement as HTMLElement;

    // remove focus from text input
    if(inputField){ inputField.blur() };  
  }

  return (
    <>
      <form
        className={"search_form--" + theme}
        onSubmit={handleSearch}
      >
          <input
          type="search"
          className={`search_form--input search_form--input--${theme}`}
          autoFocus
          placeholder="Search by Title or Author..."
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
