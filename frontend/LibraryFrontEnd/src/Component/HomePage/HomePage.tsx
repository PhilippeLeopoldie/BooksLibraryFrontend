import { BookCard } from "../BookCard/BookCard";
import "./HomePage.css";
import { BOOK_LIST_URL } from "../../Url";
import { BOOK_TOP_BOOK_URL } from "../../Url";
import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../App/App";

type BooksType = {
  
    id: number;
    title: string;
    author: string;
    imageUrl?: string;
    averageRate: number;
    opinions?: OpinionType | null;
  
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

export const HomePage = () => {
  const theme = useContext(ThemeContext);
  const [books, setBooks] = useState<BooksType[] | null>(null);
  const [topBook, setTopBook] = useState<TopBookType[] | null>(null);
  const [numberOfBooks, setNumberOfBook] = useState<number>(3);
  const [isFetched, setIsfetched] = useState<boolean>(false);
  const fetchBooks = async () => {
    try {
      const booksResponse: Response = await fetch(BOOK_LIST_URL);
      if (booksResponse.status === 200) {
        const booksResponseData = await booksResponse.json();
        setBooks(booksResponseData.books);
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
        setTopBook(topBookResponseData);
      } else if (topBookResponse.status === 404) {
        console.log(topBookResponse);
      }
    } catch (error) {
      console.error("Error fetching TopBook:", error);
    }
  };

  useEffect(() => {
    if(books === null) {
      fetchBooks();
      fetchTopBook();
    }
  }, []);

  if (!books) {
    return <h1 className={"Books__Loading--" + theme}>Loading...</h1>;
  }

  return (
    <>
      <header className={`BookList--${theme} books__header--flex`}>
        <h1 className="BookList">{`Top ${numberOfBooks} Most popular`}</h1>
        <div className="bookListContainer">
          {topBook?.map((book) => ( 
              <BookCard key={book.id} book={book}/>        
          ))}
        </div>
      </header>
      <h1 className={`BookList--${theme}`}>New books</h1>
      <main className="bookListContainer">
        {books &&
          Array.isArray(books) &&
          books
            .sort((a, b) => b.id - a.id)
            .map((bookDetail) => (
              <BookCard key={bookDetail.id} book={bookDetail} />
            ))}
      </main>
    </>
  );
};
