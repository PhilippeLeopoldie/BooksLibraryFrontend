import { Rate } from "../Rate/Rate";
import "./OpinionList.css";
import ArrowLeftIcone from "../../media/arrowLeft.svg";
import { useState } from "react";

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
      <div className="OpinionList OpinionList__container--grid">
        <header className="OpinionList OpinionList__header">
        <img
            className="OpinionList OpinionList__footer__ArrowLeftIcone"
            src={ArrowLeftIcone}
            onClick={() => displayReviews()}
            alt="Back"
          />
          <h2 className="OpinionList OpinionList__header__title">
            {book?.title}
          </h2>
          <h3 className="OpinionList OpinionList__header__author">
            By: {book?.author}
          </h3>
        </header>
        <main className="OpinionList">
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
          <section className=" OpinionList OpinionList__reviews">
            {filteredOpinion &&
              filteredOpinion
                .sort((a, b) => b.id - a.id)
                .map((review, index) => (
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
                    <p className="OpinionList OpinionList__view">
                      {review.view}
                    </p>
                    <hr className="OpinionList OpinionList__horizontalLine" />
                  </div>
                ))}
          </section>
        </main>
        <footer className="OpinionList OpinionList__footer">
          
        </footer>
      </div>
    </>
  );
};
