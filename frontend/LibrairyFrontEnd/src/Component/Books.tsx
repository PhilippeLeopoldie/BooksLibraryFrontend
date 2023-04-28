import { useEffect, useState } from "react";
import { BookType, OpinionType } from "../Type";
import FetchApi from "../FetchApi";

import { FetchOpinions } from "./FetchOpinion";
import trash from "../media/delete.svg";

function Books() {
  
  const [Opinions, setOpinions] = useState<OpinionType[]>();
  const [books, setBooks] = useState<BookType[]>();
  const random = books?.at(Math.floor(Math.random() * books.length));

  useEffect(() => {
    FetchApi("http://localhost:5133/api/Books").then((books) =>
      setBooks(books)
    );
    FetchApi("http://localhost:5133/api/Opinions").then(
      (opinions) => setOpinions(opinions)
    );
  }, []);

  const DeleteBook = async (bookId: number) => {
    await fetch(`http://localhost:5133/api/Books/${bookId}`, {
      method: "DELETE",
    }).then(() => {
      window.location.reload();
    });
  };

  return (
    <div className="books">
      <h2>Recommendation of the day</h2>
      <h3>{random?.title}</h3>
      <div className="bookcontainer">
        {books?.map((book, index) => (
          <div className="bookcard">
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
              <h2 className="booktitle" key={index}>
                {book.title}
              </h2>
              <h3 className="bookauthor" key={index}>
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
