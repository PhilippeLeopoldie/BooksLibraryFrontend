import "./Book.css";
import { Opinion } from "../../Opinions/Opinion/Opinion";
import { OpinionCreate } from "../../Opinions/OpinionCreate/OpinionCreate";
import { OpinionList } from "../../Opinions/OpinionList/OpinionList";
import { ThemeContext } from "../../App/App";
import { BOOK_BY_BOOKID_URL } from "../../../Url";
import { useContext, useEffect, useState } from "react";

type BookType = {
  book: {
    id: number;
    title: string;
    author: string;
    averageRate: number;
    imageUrl?: string;
  };
};

type Reviews = {
  id: number;
  rate: number;
  view: string;
  userName: string;
  postDate: string;
  bookId: number;
};

export const Book = ({ book }: BookType) => {
  const theme = useContext(ThemeContext);
  const [updatedBook, setUpdatedBook] = useState<BookType>({ book });
  const [displayCreateOpinion, setDisplayCreateOpinion] =
    useState<boolean>(false);
  const [opinionCreated, setOpinionCreated] = useState<boolean>(false);
  const [displayReview, setDisplayReview] = useState<Boolean>(false);
  const [averageClick, setAverageclick] = useState<Boolean>(false);
  const [reviewList, setReviewList] = useState<Reviews[]>();

  const fetchBook = async () => {
    try {
      const bookResponse: Response = await fetch(
        `${BOOK_BY_BOOKID_URL}${book?.id}`
      );
      if (bookResponse.status === 200) {
        const bookResponseData = await bookResponse.json();
        setUpdatedBook(bookResponseData);
      } else if (bookResponse.status === 404) {
        console.log(bookResponse);
      }
    } catch (error) {
      console.error(`Error fetching bookId:${book?.id}`, error);
    }
  };
  useEffect(() => {
    opinionCreated === true && fetchBook();
    console.log("opinionCreated status: ", opinionCreated);
  }, [opinionCreated]);

  const toggleOpinionList = () => {
    setDisplayReview(!displayReview);
    setAverageclick(false);
  };
  const handleOpinionList = (reviews: Reviews[]) => {
    toggleOpinionList();
    setReviewList(reviews);
  };

  const toggleCreateOpinion = () => {
    setDisplayCreateOpinion(!displayCreateOpinion);
  };

  const handleCreatedOpinion = (value: boolean) => {
    setOpinionCreated(value);
  };

  return (
    <>
      {displayReview ? (
        <OpinionList
          opinions={reviewList}
          displayReviews={() => toggleOpinionList()}
          book={book}
        />
      ) : book && !displayCreateOpinion ? (
        <div className={"bookcard--grid bookcard--" + theme}>
          <img
            src={book.imageUrl && `${book.imageUrl}`}
            className="boocard__Image"
            alt="bookImage"
            width="288px"
            height="326px"
          />
          <header className="bookcard__header">
            <h3 title="Book Title" className="booktitle">
              {book.title.length > 40
                ? `${book.title.slice(0, 40)}...`
                : book.title}
            </h3>
            <h3 className="bookauthor">by: {book.author}</h3>
          </header>
          <footer className="bookcard__footer--flex">
            <div className="footer__average-rate--flex">
              <a
                className="footer__average-rate"
                onClick={() => {
                  console.log("averageClick=", averageClick);
                  setAverageclick(!averageClick);
                }}
              >
                {book.averageRate}/5
              </a>
              <div className="rate_star"> &#9733;</div>
            </div>
            {averageClick && (
              <Opinion
                book={updatedBook?.book}
                displayReview={handleOpinionList}
              />
            )}
            
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
        <OpinionCreate
          book={book && book}
          toCreate={toggleCreateOpinion}
          created={handleCreatedOpinion}
        />
      )}
    </>
  );
};
