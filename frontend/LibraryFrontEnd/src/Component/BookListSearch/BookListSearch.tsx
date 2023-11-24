import { Book } from "../Book/Book";
import "../BookList/BookList.css";
import { useContext, useEffect, useState } from "react";
import {BOOK_BY_TITLE_OR_AUTHOR_URL} from "../../Url";
import { ThemeContext } from "../App/App";

type BooksType = {
  book: {
    id: number;
    title: string;
    author: string;
  };
};

type BooksSearchCriteria = {
  titleOrAuthor: string;
};

export const BookListSearch = ({ titleOrAuthor }: BooksSearchCriteria) => {
  const theme = useContext(ThemeContext);
  const [books, setBooks] = useState<BooksType[] | null>([]);
  const handleDeleteBook = (bookId: number) => {
    setBooks((books) => {
      if (books !== null) {
        return books.filter((book) => book.book.id !== bookId);
      } else {
        return null;
      }
    });
  };

  const fetchBooksByTitleOrAuthor = async () => {
    try {
      if (titleOrAuthor === "") {
        setBooks([]);
      }
      if (titleOrAuthor !== "") {
        const booksResponse: Response = await fetch(
          BOOK_BY_TITLE_OR_AUTHOR_URL + titleOrAuthor
        );
        if (booksResponse.status === 200) {
          const booksResponseData = await booksResponse.json();
          setBooks(booksResponseData.$values);
        } else if (booksResponse.status === 404) {
          setBooks([]);
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

  return (
    <>
      <div className={"bookListSearchContainer--" + theme}>
        <h2>
          {books && books.length > 1
            ? `(${books.length}) books found`
            : `(${books?.length}) book found`}
        </h2>
        <div className="bookListContainer">
          {books &&
            Array.isArray(books) &&
            books
              .sort((a, b) => b.book.id - a.book.id)
              .map((bookDetail, index) => (
                <Book
                  key={bookDetail.book.id}
                  book={bookDetail.book}
                  onDelete={handleDeleteBook}
                />
              ))}
        </div>
      </div>
    </>
  );
};
