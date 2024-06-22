import { BookCard } from "../BookCard/BookCard";
import "../BookList/BookList.css";
import { useContext, useEffect, useState } from "react";
import {BOOK_BY_TITLE_OR_AUTHOR_URL} from "../../../Url";
import { ThemeContext } from "../../App/App";

type BooksType = {
  book: {
    id: number;
    title: string;
    author: string;
    averageRate: number;
  };
};

type BooksSearchCriteria = {
  titleOrAuthor: string;
};

export const BookSearchList = ({ titleOrAuthor }: BooksSearchCriteria) => {
  
  const [books, setBooks] = useState<BooksType[] | null>([]);
  const [loading, setLoading] = useState<string>("Loading...");
  const theme = useContext(ThemeContext);
  const fetchBooksByTitleOrAuthor = async () => {
    try {
      if (titleOrAuthor === "") {
        setBooks([]);
        setLoading("Loading...");
      }
      if (titleOrAuthor !== "") {
        const booksResponse: Response = await fetch(
          BOOK_BY_TITLE_OR_AUTHOR_URL + titleOrAuthor
        );
        if (booksResponse.status === 200) {
          const booksResponseData = await booksResponse.json();
          setBooks(booksResponseData.$values);
          setLoading("");
        } else if (booksResponse.status === 404) {
          setBooks([]);
          setLoading("");
          console.log(booksResponse);
        }
      }
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  useEffect(() => {
    fetchBooksByTitleOrAuthor();
  }, [titleOrAuthor]);

  if (titleOrAuthor==="") {
    return <h1 className={"bookListSearchContainer--" + theme}></h1>;
  }
  if (titleOrAuthor !="" && loading) {
    return <h1 className={"bookListSearchContainer--" + theme}>{loading}</h1>;
  }

  return (
    <>
      <div className={"bookListSearchContainer--" + theme}>
        <h2>
          {books && books.length > 1
            ? `(${books.length}) books found`
            : `(${books?.length}) book found`}
        </h2>
        <div className={books && books.length > 1 ? "bookListContainer" :"bookListContainer-center"}>
          {books &&
            Array.isArray(books) &&
            books
              .sort((a, b) => b.book.id - a.book.id)
              .map((bookDetail, index) => (
                <BookCard
                  key={bookDetail.book.id}
                  book={bookDetail.book}
                />
              ))}
        </div>
      </div>
    </>
  );
};
