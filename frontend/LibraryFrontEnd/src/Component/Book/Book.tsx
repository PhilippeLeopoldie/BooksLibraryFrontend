import "./Book.css";
import { Opinion } from "../Opinion/Opinion";
import { OpinionCreate } from "../OpinionCreate/OpinionCreate";
import { OpinionList } from "../OpinionList/OpinionList";
import { ThemeContext } from "../App/App";
import trash from "../../media/delete.svg";
import url from "../../Url";
import { useContext, useState } from "react";

type BookWithDeletionHandler = {
  book?: {
    id: number;
    title: string;
    author: string;
    imageUrl?:string;
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
  const theme = useContext(ThemeContext);
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
        <div className={"bookcard--grid bookcard--" + theme}>
          <img
            src={book.imageUrl &&`${book.imageUrl}`}
            className="boocard__Image"
            alt="bookImage"
            width="288px"
            height="326px"
          />
          <header className="bookcard__header">
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
            <h3  
              title="Book Title"
              className="booktitle">{book.title.length > 40 
                ? `${book.title.slice(0, 40)}...`
                : book.title}
            </h3>
            <h3 className="bookauthor">by: {book.author}</h3>
          </header>
          <footer className="bookcard__footer--flex">
          <Opinion
            book={book}
            toCreate={toggleCreateOpinion}
            displayReview={handleOpinionList}
          />
          
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
