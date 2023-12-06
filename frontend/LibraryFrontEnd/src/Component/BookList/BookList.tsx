import { Book } from "../Book/Book";
import "./BookList.css";
import {BOOK_URL} from "../../Url";
import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../App/App";

type BooksType = {
  book: {
    id: number;
    title: string;
    author: string;
  };
};

export const BookList = () => {
  const theme = useContext(ThemeContext);
  const [books, setBooks] = useState<BooksType[] | null>(null);

  /* const handleDeleteBook = (bookId: number) => {
    setBooks((books) => {
      if (books !== null) {
        return books.filter((book) => book.book.id !== bookId);
      } else {
        return [];
      }
    });
  }; */

  const fetchBooks = async () => {
    try {
      const booksResponse: Response = await fetch(BOOK_URL);
      if (booksResponse.status === 200) {
        const booksResponseData = await booksResponse.json();
        setBooks(booksResponseData.$values);
      } else if (booksResponse.status === 404) {
        console.log(booksResponse);
      }
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  if (!books) {
    return <h1 className={"Books__Loading--"+theme}>Loading...</h1>;
  }

  const randomIndex = Math.floor(Math.random() * books.length);
  const random = books[randomIndex];
  return (
    <>
      <header className={`BookList--${theme} books__header--flex`}>
        <h2 className="BookList">Recommendation of the day</h2>
        <h3 className="BookList">{random?.book.title}</h3>
      </header>
      <main className="bookListContainer">
        {books &&
          Array.isArray(books) &&
          books
            .sort((a, b) => b.book.id - a.book.id)
            .map((bookDetail, index) => (
              <Book
                key={bookDetail.book.id}
                book={bookDetail.book}
                /* onDelete={handleDeleteBook} */
              />
            ))}
      </main>
    </>
  );
};
