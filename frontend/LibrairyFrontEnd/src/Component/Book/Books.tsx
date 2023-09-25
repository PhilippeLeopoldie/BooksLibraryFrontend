import { useEffect, useState } from "react";
import { BookType, OpinionType } from "../../Type";
import FetchApi from "../../FetchApi";
import url from "../../Url";
import { FetchOpinions } from "../Opinion/FetchOpinion";
import trash from "../../media/delete.svg";

function Books() {
  const [opinions, setOpinions] = useState<OpinionType[]>();
  const [books, setBooks] = useState<BookType[]>([]);
  const random = books?.at(Math.floor(Math.random() * books.length));

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
    FetchApi(url + "api/Opinion").then((opinions) => setOpinions(opinions));
  }, []);

  const DeleteBook = async (bookId: number) => {
    try {
      await fetch(url + `api/Book/${bookId}`, {
        method: "DELETE",
      });
      setBooks((books) => books.filter((book) => book.book.id !== bookId));
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  return (
    <div className="books">
      <h2>Recommendation of the day</h2>
      <h3>{random?.book.title}</h3>
      <div className="bookcontainer">
        {books &&
          books.map((bookDetail, index) => (
            <div className="bookcard" key={bookDetail.book.id}>
              <div className="bookcard--header">
                <button
                  className=" button booktitle--trashbutton"
                  type="submit"
                  onClick={async () => {
                    await DeleteBook(bookDetail.book.id);
                  }}
                >
                  <img
                    className="icone bookcard--iconeTrash"
                    src={trash}
                    alt="delete"
                  />
                </button>
                <h2 className="booktitle">{bookDetail.book.title}</h2>
                <h3 className="bookauthor">by: {bookDetail.book.author}</h3>
              </div>

              <FetchOpinions bookId={bookDetail.book.id} />
            </div>
          ))}
      </div>
    </div>
  );
}
export default Books;
