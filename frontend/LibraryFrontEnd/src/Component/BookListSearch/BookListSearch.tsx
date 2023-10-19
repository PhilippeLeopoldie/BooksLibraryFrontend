import { Book } from "../Book/Book";
import { useEffect, useState } from "react";
import url from "../../Url";

type BooksType = {
  book: {
    id: number;
    title: string;
    author: string;
  };
};

type BooksSearchCriteria = {
  searchCriteria?: {
    title: string;
    author: string;
  };
};

export const BookListSearch = ({ searchCriteria }: BooksSearchCriteria) => {
  const [books, setBooks] = useState<BooksType[]>([]);
  const [initialBooks, setInitialBooks] = useState<BooksType[]>([]);
  let filteredBooks: BooksType[] = [];
  const handleDeleteBook = (bookId: number) => {
    setBooks((books) => {
      if (books !== null) {
        return books.filter((book) => book.book.id !== bookId);
      } else {
        return [];
      }
    });
  };

  const fetchBooks = async () => {
    try {
      const booksResponse: Response = await fetch(url + "api/Book");
      if (booksResponse.status === 200) {
        const booksResponseData = await booksResponse.json();
        setInitialBooks(booksResponseData.$values);
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

  useEffect(() => {
    if (searchCriteria !== undefined) {
      if (searchCriteria.title === "" && searchCriteria.author === "") {
        filteredBooks = [];
      } else {
        filteredBooks = initialBooks.filter((books) => {
          const titleMatches = books.book.title
            .toLowerCase()
            .includes(searchCriteria.title.toLowerCase());

          const authorMatches = books.book.author
            .toLowerCase()
            .includes(searchCriteria.author.toLowerCase());

          return titleMatches || authorMatches;
        });
      }
      console.log("filteredBooks value", filteredBooks);
      console.log("searchCriteria :", searchCriteria);
      setBooks(filteredBooks);
    }
  }, [searchCriteria]);

  if (!books) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <div className="books">
        <h2>({books.length}) books found</h2>
        <div className="booksContainer" data-testid="booksContainer">
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
