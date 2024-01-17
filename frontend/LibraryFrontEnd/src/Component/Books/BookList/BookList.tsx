import { Book } from "../Book/Book";
import "./BookList.css";
import { BOOK_URL } from "../../../Url";
import { BOOK_TOP_BOOK_URL } from "../../../Url";
import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../../App/App";

type BooksType = {
  book: {
    id: number;
    title: string;
    author: string;
    imageUrl?: string;
    averageRate: number;
    opinions?: OpinionType | null;
  };
};

type TopBookType = {
  id: number;
  title: string;
  author: string;
  imageUrl?: string;
  averageRate: number;
  opinions?: OpinionType | null;
};

type OpinionType = {
  rate: number;
  view: string;
  userName: string;
};

export const BookList = () => {
  const theme = useContext(ThemeContext);
  const [books, setBooks] = useState<BooksType[] | null>(null);
  const [topBook, setTopBook] = useState<TopBookType[] | null>(null);
  const [numberOfBooks, setNumberOfBook] = useState<number>(3);
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

  const fetchTopBook = async () => {
    try {
      const topBookResponse: Response = await fetch(`${BOOK_TOP_BOOK_URL} ${numberOfBooks}`);
      if (topBookResponse.status === 200) {
        const topBookResponseData = await topBookResponse.json();
        setTopBook(topBookResponseData.$values);
        console.log("topBook:", topBook);
        console.log(
          "topBook title:",
          topBook?.map((book) => book.title)
        );
      } else if (topBookResponse.status === 404) {
        console.log(topBookResponse);
      }
    } catch (error) {
      console.error("Error fetching TopBook:", error);
    }
  };

  useEffect(() => {
    fetchBooks();
    fetchTopBook();
  }, []);

  if (!books) {
    return <h1 className={"Books__Loading--" + theme}>Loading...</h1>;
  }

  return (
    <>
      <header className={`BookList--${theme} books__header--flex`}>
        <h1 className="BookList">{`Top ${numberOfBooks} Most popular`}</h1>
        <div className="BookList BookList__mostPopular">
          {topBook?.map((book) => ( 
              <Book key={book.id} book={book}/>        
          ))}
        </div>
      </header>
      <h1 className={`BookList--${theme}`}>New books</h1>
      <main className="bookListContainer">
        {books &&
          Array.isArray(books) &&
          books
            .sort((a, b) => b.book.id - a.book.id)
            .map((bookDetail) => (
              <Book key={bookDetail.book.id} book={bookDetail.book} />
            ))}
      </main>
    </>
  );
};
