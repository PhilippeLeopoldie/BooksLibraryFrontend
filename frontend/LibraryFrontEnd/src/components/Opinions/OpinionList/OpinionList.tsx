import { BookType, ReviewType } from "../../../constants/types";
import { Rate } from "../../Rates/Rate/Rate";
import "./OpinionList.css";
import Flip from "../../../media/flip.svg";
import { numberOfReviewsValidation } from '../../../constants/commonFunctions';
import { useContext, useState } from "react";
import { ThemeContext } from "../../../App/App";

type DisplayReview = () => void;

export const OpinionList = ({
  opinions,
  displayReviews,
  book,
}: {
  opinions: ReviewType[] | undefined;
  displayReviews: DisplayReview;
  book: BookType | undefined;
}) => {
  const theme = useContext(ThemeContext);
  const [filteredOpinion, setFilteredOpinion] = useState<ReviewType[] | undefined>(
    opinions
    );
    const opinionsLength = opinions?.length;
    
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
  const ratings = [0,1,2,3,4,5];

  return (
    <>
      <section className={`OpinionList--${theme} OpinionList__container--grid OpinionList__container--${theme}`}>
        <header className={`OpinionList--${theme} OpinionList__header`}>
          <section className={`OpinionList--${theme} OpinionList__header--flex`}>
            <img
              className={`OpinionList--${theme} OpinionList__header__flip`}
              src={Flip}
              onClick={() => displayReviews()}
              alt="Back"
            />
            <h2 className={`OpinionList--${theme} OpinionList__header__title`}>
              {book?.title}
            </h2>
          </section>
          
          <h3 className={`OpinionList--${theme} OpinionList__header__author`}>
            By: {book?.author}
          </h3>
                  <h3 className={`OpinionList--${theme} OpinionList__header__nbReview`}>
                      {numberOfReviewsValidation(opinionsLength)}
            </h3>
        </header>
        <main className={`OpinionList--${theme} OpinionList__main--flex`}>
          <section className="OpinionList__filter--flex">
            {ratings.map((rating, index) => (
              <button
                className={`OpinionList__filter__button`}
                onClick={() => RateFilter(rating)}
                key={index}>
                    {rating === 0 ? 'All' : `${rating}★`}
              </button>
            ))}
          </section>
          <section className={` OpinionList--${theme} OpinionList__reviews`}>
            {filteredOpinion &&
              filteredOpinion
                .sort((prevReview, lastReview) => lastReview.id - prevReview.id)
                .map((review) => (
                  <div className={`OpinionList--${theme}`} key={review.id}>
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
        </main>
        <footer className={`OpinionList--${theme} OpinionList__footer`}>
          
        </footer>
      </section>
    </>
  );
};
