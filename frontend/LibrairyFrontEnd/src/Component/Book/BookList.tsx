import { useEffect, useState } from "react";
import { BookType} from "../../Type";
import FetchApi from "../../FetchApi";
import url from "../../Url";
import {Book} from "./Book";


export const Books = () => {
  const [books, setBooks] = useState<BookType[]>([]);
  const random = books?.at(Math.floor(Math.random() * books.length));

  const handleDelete = (bookId : number) => {
    setBooks((books) => books.filter((book) => book.book.id !== bookId))
  }
  const fetchBooks = async () => {
    try {
      const booksData = await FetchApi(url + "api/Book");
      setBooks(booksData.$values);  
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div className="books">
      <h2>Recommendation of the day</h2>
      <h3>{random?.book.title}</h3>
      <div className="bookcontainer">
        {books &&
          books
          .sort((a,b) => b.book.id - a.book.id)
          .map((bookDetail, index) => (
            <Book book = {bookDetail.book} onDelete ={handleDelete}/>
          ))}
      </div>
    </div>
  );
}
