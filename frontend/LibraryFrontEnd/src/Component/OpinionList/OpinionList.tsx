import { Rate } from "../Opinion/Rate/Rate";
import "./OpinionList.css";
import ArrowLeftIcone from "../../media/arrowLeft.svg"

type Review = {
  id: number;
  rate: number;
  view: string;
  userName: string;
  postDate: string;
  bookId: number;
};

type DisplayReview = () => void;

type Book = {
  id: number;
  title: string;
  author: string;
};

export const OpinionList = ({
  opinions,
  displayReviews,
  book,
}: {
  opinions: Review[] | undefined;
  displayReviews: DisplayReview;
  book: Book | undefined;
}) => {
  return (
    <>
      <div className="OpinionList OpinionList__container">
        <div className="OpinionList OpinionList__header">
          <h1 className="OpinionList">{book?.title}</h1>
          <h3 className="OpinionList">Author:{book?.author}</h3>
        </div>
        <div className="OpinionList__filter"></div>
        <div className=" OpinionList OpinionList__reviews">
          {opinions?.map((review, index) => (
            <div className="OpinionList" key={index}>
              <p className="OpinionList opinionlist__userName">
                {review.userName}
              </p>
              <div className="OpinionList OpinionList__rate--flex">
                <Rate rate={review.rate} />
                <p className="OpinionList OpinionList__date">
                  {review.postDate}
                </p>
              </div>
              <p className="OpinionList OpinionList__view">{review.view}</p>
              <hr className="OpinionList OpinionList__horizontalLine" />
            </div>
          ))}
        </div>
        <div className="OpinionList OpinionList__footer--flex">
          <img 
            className="OpinionList OpinionList__footer__ArrowLeftIcone" 
            src={ArrowLeftIcone}
            onClick={() => displayReviews()}
            alt="Back"
          />
        </div>
        
      </div>
    </>
  );
};
