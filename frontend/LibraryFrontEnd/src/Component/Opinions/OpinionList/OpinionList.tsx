import { Rate } from "../../Rates/Rate/Rate";
import "./OpinionList.css";
import ArrowLeftIcone from "../../../media/arrowLeft.svg";
import { useContext, useState } from "react";
import { ThemeContext } from "../../App/App";

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
  const theme = useContext(ThemeContext);
  const [filteredOpinion, setFilteredOpinion] = useState<Review[] | undefined>(
    opinions
  );

  const RateFilter = (rateToFilter: number) => {
    if (opinions) {
      if (rateToFilter !== 0) {
        return setFilteredOpinion(
          opinions.filter((opinion) => opinion.rate === rateToFilter)
        );
      }
      setFilteredOpinion(opinions);
    }
  };

  return (
    <>
      <section className={`OpinionList--${theme} OpinionList__container--grid OpinionList__container--${theme}`}>
        <header className={`OpinionList--${theme} OpinionList__header`}>
        <img
            className={`OpinionList--${theme} OpinionList__footer__ArrowLeftIcone`}
            src={ArrowLeftIcone}
            onClick={() => displayReviews()}
            alt="Back"
          />
          <h2 className={`OpinionList--${theme} OpinionList__header__title`}>
            {book?.title}
          </h2>
          <h3 className={`OpinionList--${theme} OpinionList__header__author`}>
            By: {book?.author}
          </h3>
          <h3 className={`OpinionList--${theme} OpinionList__header__nbReview`}>
          {opinions &&
                    (opinions.length > 1
                      ? `${opinions.length} reviews:`
                      : `${opinions.length} review:`)}
            </h3>
        </header>
        <main className={`OpinionList--${theme} OpinionList__main--flex`}>
          <section className="OpinionList__filter--flex">
            <button
              className="OpinionList__filter__button"
              onClick={() => RateFilter(0)}
            >
              All
            </button>
            <button
              className="OpinionList__filter__button"
              onClick={() => RateFilter(1)}
            >
              1&#9733;
            </button>
            <button
              className="OpinionList__filter__button"
              onClick={() => RateFilter(2)}
            >
              2&#9733;
            </button>
            <button
              className="OpinionList__filter__button"
              onClick={() => RateFilter(3)}
            >
              3&#9733;
            </button>
            <button
              className="OpinionList__filter__button"
              onClick={() => RateFilter(4)}
            >
              4&#9733;
            </button>
            <button
              className="OpinionList__filter__button"
              onClick={() => RateFilter(5)}
            >
              5&#9733;
            </button>
          </section>
          <section className={` OpinionList--${theme} OpinionList__reviews`}>
            {filteredOpinion &&
              filteredOpinion
                .sort((a, b) => b.id - a.id)
                .map((review, index) => (
                  <div className={`OpinionList--${theme}`} key={index}>
                    <p className={`OpinionList--${theme} opinionlist__userName`}>
                      {review.userName}
                    </p>
                    <div className={`OpinionList--${theme} OpinionList__rate--flex`}>
                      <Rate rate={review.rate} />
                      <p className={`OpinionList--${theme} OpinionList__date`}>
                        {review.postDate}
                      </p>
                    </div>
                    <p className={`OpinionList--${theme} OpinionList__view`}>
                      {review.view}
                    </p>
                    <hr className={`OpinionList--${theme} OpinionList__horizontalLine`} />
                  </div>
                ))}
          </section>
        </body>
        <footer className={`OpinionList--${theme} OpinionList__footer`}>
          
        </footer>
      </section>
    </>
  );
};
