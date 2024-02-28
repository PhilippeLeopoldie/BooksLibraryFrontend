import "./Book.css";
import { BookZoomImage } from "../BookZoomImage/BookZoomImage";
import { BookPresentation } from "../BookPresentation/BookPresentation";
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

  // allow display the chosen card
  const [display, setDisplay] = useState<string>("bookPresentation");

  const [opinionCreated, setOpinionCreated] = useState<boolean>(false);

  const [averageClick, setAverageclick] = useState<Boolean>(false);
  const [reviewList, setReviewList] = useState<Reviews[]>();
  const [imageZoom, setImageZoom] = useState<string>("zoomOut");

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

  // update rate after creating an opinion
  useEffect(() => {
    opinionCreated === true && fetchBook();
    console.log(`opinionCreated has changed its value is : ${opinionCreated}`);
  }, [opinionCreated]);

  const toggleZoomImage = () => {
    imageZoom === "zoomOut" ? setImageZoom("zoomIn") : setImageZoom("zoomOut");
  };

  const toggleOpinionList = () => {
    display === "bookPresentation"
      ? setDisplay("OpinionList")
      : setDisplay("bookPresentation");
    setAverageclick(false);
  };
  const handleOpinionList = (reviews: Reviews[]) => {
    toggleOpinionList();
    setReviewList(reviews);
  };

  const toggleCreateOpinion = (displayValue: string) => {
    display === "bookPresentation"
      ? setDisplay(displayValue)
      : setDisplay(displayValue);
  };

  const handleCreatedOpinion = (value: boolean) => {
    setOpinionCreated(value);
  };

  let displayedContent: JSX.Element = <></>;

  if (display === "OpinionList") {
    displayedContent = (
      <OpinionList
        opinions={reviewList}
        displayReviews={() => toggleOpinionList()}
        book={book}
      />
    );
  }
  if (book && display === "bookPresentation") {
    displayedContent = (
      <div className={"bookcard--grid bookcard--" + theme}>
        <BookPresentation book={book} />
        <footer className="bookcard__footer--flex">
          <div className="footer__average-rate--flex">
            {!averageClick ? (
              <div className="footer__average-rate--flex">
                <a
                  className="footer__average-rate"
                  onClick={() => {
                    console.log("averageClick=", averageClick);
                    setAverageclick(!averageClick);
                  }}
                >
                  {updatedBook.book.averageRate}/5
                </a>
                <div className="rate_star"> &#9733;</div>
              </div>
            ) : (
              <h4 className={`opinion__loading opinion__loading--${theme}`}>
                Loading...
              </h4>
            )}
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
              toggleCreateOpinion("createOpinion");
            }}
          >
            Rate this book
          </button>
        </footer>
      </div>
    );
  }
  if (display === "createOpinion") {
    displayedContent = (
      <OpinionCreate
        book={book && book}
        toCreate={toggleCreateOpinion}
        created={handleCreatedOpinion}
      />
    );
  }

  return <>{displayedContent}</>;
};
