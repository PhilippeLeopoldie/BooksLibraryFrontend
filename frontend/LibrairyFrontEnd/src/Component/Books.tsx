import { useEffect, useState } from "react";
import { BookType, OpinionType } from "../Type";
import FetchApi from "../FetchApi";

import { FetchOpinions } from "./FetchOpinion";
import trash from "../media/delete.svg";

function Books() {
  const [opinions, setOpinions] = useState<OpinionType[]>();
  const [books, setBooks] = useState<BookType[]>([]);
  const random = books?.at(Math.floor(Math.random() * books.length));
 

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const booksData = await FetchApi("https://leopoldie-booklibrary-backend.herokuapp.com/api/Book");
        setBooks(booksData.$values);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };
  
    fetchBooks();
    FetchApi(
      "https://leopoldie-booklibrary-backend.herokuapp.com/api/Opinion"
    ).then((opinions) => setOpinions(opinions));
  }, []);

  const DeleteBook = async (bookId: number) => {
    await fetch(
      `https://leopoldie-booklibrary-backend.herokuapp.com/api/Book/${bookId}`,
      {
        method: "DELETE",
      }
    ).then(() => {
      window.location.reload();
    });
  };

  return (
    <div className="books">
      <h2>Recommendation of the day</h2>
      <h3>{random?.title}</h3>
      <div className="bookcontainer">
        {books &&
          books.map((book, index) => (
            <div className="bookcard" key={book.bookId}>
              <div className="bookcard--header">
                <button
                  className=" button booktitle--trashbutton"
                  type="submit"
                  onClick={async () => {
                    await DeleteBook(book.bookId);
                  }}
                >
                  <img className="icone bookcard--iconeTrash" src={trash} />
                </button>
                <h2 className="booktitle" >
                  {book.title}
                </h2>
                <h3 className="bookauthor">
                  by: {book.author}
                </h3>
              </div>

              <FetchOpinions bookId={book.bookId} />
            </div>
          ))}
      </div>
    </div>
  );
}
export default Books;
