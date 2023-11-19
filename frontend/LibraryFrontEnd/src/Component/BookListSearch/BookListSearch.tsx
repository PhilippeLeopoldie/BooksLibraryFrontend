import { Book } from "../Book/Book";
import '../BookList/BookList.css'
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
  const [books, setBooks] = useState<BooksType[] | null>(null);
  const [initialBooks, setInitialBooks] = useState<BooksType[]>([]);
  let filteredBooks: BooksType[] = [];
  const handleDeleteBook = (bookId: number) => {
    setBooks((books) => {
      if (books !== null) {
        return books.filter((book) => book.book.id !== bookId);
      } else {
        return null;
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
      (searchCriteria.title === "" && searchCriteria.author === "") ? 
        filteredBooks = []
       : 
        filteredBooks = Array.isArray(initialBooks)? initialBooks.filter((books) => {
          const titleMatches = books.book.title
            .toLowerCase()
            .includes(searchCriteria.title.toLowerCase());

          const authorMatches = books.book.author
            .toLowerCase()
            .includes(searchCriteria.author.toLowerCase());

          return titleMatches || authorMatches;
        }):[];
      
      setBooks(filteredBooks);
    }
  }, [searchCriteria]);

  if (!books) {
    return <h1></h1>;
  }

  return (
    <>
      <div className="books">
        <h2>{books && books.length>1 ?
          `(${books.length}) books found`
          :
          `(${books.length}) book found`} 
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
