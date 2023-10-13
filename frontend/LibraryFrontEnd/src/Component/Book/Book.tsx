import { Opinion } from "../Opinion/Opinion";
import url from "../../Url";
import trash from "../../media/delete.svg";
import { useState } from "react";
import { OpinionEdit } from "../OpinionEdit/OpinionEdit";

type BookWithDeletionHandler = {
  book: {
    id: number;
    title: string;
    author: string;
  };
  onDelete: Function;
};

type EditOpinion = {
  id: number,
  rate: number,
  view: string,
  userName: string,
  bookId: number
}

export const Book = ({ book, onDelete }: BookWithDeletionHandler) => {
  const initialeditopinion = {
    id: 0,
    rate: 0,
    view: "",
    userName: "",
    bookId:0
  }
  const [editHandling, setEditHandling] = useState<Boolean>(false);
  const [editOpinion, setEditOpinion] = useState<EditOpinion>(initialeditopinion);
  
  
  const toggleEditOpinion = (opinionEdited:EditOpinion) => {
    setEditOpinion(opinionEdited);
    setEditHandling(!editHandling);
    
  };

  const DeleteBook = async (bookId: number) => {
    try {
      await fetch(url + `api/Book/${bookId}`, {
        method: "DELETE",
      });
      onDelete(bookId);
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  return (
    <>
      {!editHandling ? (
        <div className="bookcard" key={book.id}>
          <div className="bookcard--header">
            <button
              className=" button booktitle--trashbutton"
              type="submit"
              onClick={async () => {
                await DeleteBook(book.id);
              }}
            >
              <img
                className="icone bookcard--iconeTrash"
                src={trash}
                alt="delete"
              />
            </button>
            <h2 className="booktitle">{book.title}</h2>
            <h3 className="bookauthor">by: {book.author}</h3>
          </div>
          <Opinion bookId={book.id} onEdit={(editOpinion) =>toggleEditOpinion(editOpinion)} />
        </div>
      ) : (
        <OpinionEdit opinion={editOpinion} toEdit={(editOpinion) =>
          toggleEditOpinion(editOpinion)} />
      )}
    </>
  );
};
