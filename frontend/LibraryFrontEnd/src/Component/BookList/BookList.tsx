import { Book } from "../Book/Book";
import { BookType } from "../../Type";
import url from "../../Url";
import { useEffect, useState } from "react";


export const BookList = () => {
  const [books, setBooks] = useState<BookType[] | null>(null);

  const handleDeleteBook = (bookId: number) => {

    setBooks((books) => {
      if(books!==null) {
        return books.filter((book) => book.book.id !== bookId);
      } else {
        return[]
    }
  }) 

  };
    
  

  const fetchBooks = async () => {
    try {
      const booksResponse : Response = (await fetch(url + "api/Book"));
      if(booksResponse.status === 200) {
        const booksResponseData  = await booksResponse.json();
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

  if(!books) {
    return <h1>Loading...</h1>
  }
  

  const random = books?.at(Math.floor(Math.random() * books.length));
  return (
    <div className="books">
      <h2>Recommendation of the day</h2>
      <h3>{random?.book.title}</h3>
      <div className="booksContainer">
        {books &&
          books
            .sort((a, b) => b.book.id - a.book.id)
            .map((bookDetail, index) => (
              <Book key={bookDetail.book.id} book={bookDetail.book} onDelete={handleDeleteBook} />
            ))}
      </div>
    </div>
  );
};
