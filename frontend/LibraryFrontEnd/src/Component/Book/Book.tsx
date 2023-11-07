import "./Book.css";
import { Opinion } from "../Opinion/Opinion";
import { OpinionCreate } from "../OpinionCreate/OpinionCreate";
import { OpinionList } from "../OpinionList/OpinionList";
import trash from "../../media/delete.svg";
import url from "../../Url";
import { useState } from "react";

type BookWithDeletionHandler = {
  book?: {
    id: number;
    title: string;
    author: string;
  };
  onDelete?: Function;
};

type Reviews = {
  id: number;
  rate: number;
  view: string;
  userName: string;
  postDate: string;
  bookId: number;
};

export const Book = ({ book, onDelete }: BookWithDeletionHandler) => {
  const [createOpinionHandling, setCreateOpinionHandling] =
    useState<boolean>(false);
  const [displayReview, setDisplayReview] = useState<Boolean>(false);
  const [reviewList, setReviewList] = useState<Reviews[]>();

  const toggleOpinionList = () => {
    setDisplayReview(!displayReview);
  };
  const handleOpinionList = (reviews: Reviews[]) => {
    toggleOpinionList();
    setReviewList(reviews);
  };

  const toggleCreateOpinion = () => {
    setCreateOpinionHandling(!createOpinionHandling);
  };

  const DeleteBook = async (bookId: number) => {
    try {
      await fetch(url + `api/Book/${bookId}`, {
        method: "DELETE",
      });
      onDelete && onDelete(bookId);
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  return (
    <>
      {displayReview ? (
        <OpinionList
          opinions={reviewList}
          displayReviews={() => toggleOpinionList()}
          book={book}
        />
      ) : book && !createOpinionHandling ? (
        <div className="bookcard--grid">
          <header className="bookcard--header">
            {/* <button
            
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
            </button> */}
            <textarea
              title="Book Title"
              name="Book Title"
              className="booktitle"
              value={book.title}
              readOnly
            />
            <h3 className="bookauthor">by: {book.author}</h3>
          </header>
          <Opinion
            book={book}
            toCreate={toggleCreateOpinion}
            displayReview={handleOpinionList}
          />
          <footer>
            <button
              className="button bookCard__RateButton"
              onClick={() => {
                toggleCreateOpinion();
              }}
            >
              Rate this book
            </button>
          </footer>
        </div>
      ) : (
        <OpinionCreate book={book && book} toCreate={toggleCreateOpinion} />
      )}
    </>
  );
};
