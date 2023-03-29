import React, { useEffect, useState } from "react";
import { BookType, OpinionType } from "../Type";
import FetchApi from "../FetchApi";

import { FetchOpinions } from "./FetchOpinion";
import trash from "../media/delete.svg";


function Books() {
  const [Opinions, setOpinions] = useState<OpinionType[]>();
  const [books, setBooks] = useState<BookType[]>();
 

  useEffect(() => {
    FetchApi("https://bookslibrary.azurewebsites.net/api/Books").then((books) =>
      setBooks(books)
    );
    FetchApi("https://bookslibrary.azurewebsites.net/api/Opinions").then(
      (opinions) => setOpinions(opinions)
    );
  }, []);
  //console.log(books?.at(Math.floor(Math.random()*books.length)))

  let random = books?.at(Math.floor(Math.random() * books.length));
  const OpinionIdToDelete = (bookId: number) => {
    Opinions?.filter((opinion) => opinion.bookId == bookId)
      .at(0)
      ?.bookId.toString();
  };
  console.log("OpinionId to delete :", { OpinionIdToDelete });

  const DeleteOpinion = async (bookId: number) => {
    fetch(`https://bookslibrary.azurewebsites.net/api/Opinions/${bookId}`, {
      method: "DELETE",
    });
  };

  const DeleteBook = async (bookId: number) => {
    await fetch(`https://bookslibrary.azurewebsites.net/api/Books/${bookId}`, {
      method: "DELETE",
    }).then(()=>{
        window.location.reload();
    });
  };

  return (
    <div className="books">
      <h2>Recommandation of the day</h2>
      <h3>{random?.title}</h3>
      <div className="bookcontainer">
        {books?.map((book, index) => (
          <div className="bookcard">
            <div className="bookcard--header">
              <button
                className=" button booktitle--trashbutton"
                type="submit"
                onClick={async () => {
                  //await DeleteOpinion(book.bookId)

                  await DeleteBook(book.bookId);

                  // window.location.reload()
                }}
              >
                <img className="icone iconeTrash" src={trash} />
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
