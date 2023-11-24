import { useEffect, useState, useContext } from "react";
import "./Opinion.css";
import { OpinionList } from "../OpinionList/OpinionList";
import {OPINION_BY_BOOKID_URL} from "../../Url";
import modify from "../../media/write.svg";
import { Rate } from "../Rate/Rate";
import { ThemeContext } from "../App/App";

type OpinionType = {
  id: number;
  rate: number;
  view: string;
  userName: string;
  postDate: string;
  bookId: number;
};

type BookType = {
  book: {
    id: number;
    title: string;
    author: string;
  };
  onEdit?: (opinionToUpdate: OpinionType) => void;
  toCreate: () => void;
  displayReview: (opinions: OpinionType[]) => void;
};

export const Opinion = ({
  book,
  onEdit,
  toCreate,
  displayReview,
}: BookType) => {
  const theme = useContext(ThemeContext);
  const [opinions, setOpinions] = useState<OpinionType[] | null>(null);
  const [fetching, setFething] = useState<boolean>(true);
  const [lastOpinion, setLastOpinion] = useState<OpinionType | null>(null);
  const [averageRate, setAverageRate] = useState<number>(0);
  const FetchOpinionBYBookId = async (bookId: number) => {
    try {
      const response: Response = await fetch(
        OPINION_BY_BOOKID_URL + bookId
      );
      if (response.status === 200) {
        const responseData = await response.json();
        setOpinions(responseData.$values);
        setFething(false);
      } else if (response.status === 404) {
        setFething(false);
        console.log("404 response", response);
      }
    } catch (error) {
      console.error("error fetching Opinions:", error);
    }
  };

  const AverageRate = () => {
    if (opinions) {
      const rateSum = opinions.reduce(
        (total, opinion) => total + opinion.rate,
        0
      );
      const average = rateSum / opinions.length;

      const formattedAverage = Number(average.toFixed(1));
      setAverageRate(formattedAverage);
    }
  };

  useEffect(() => {
    FetchOpinionBYBookId(book.id);
  }, []);

  useEffect(() => {
    opinions &&
      opinions.length > 0 &&
      setLastOpinion(opinions[opinions.length - 1]);
    AverageRate();
  }, [opinions]);

  if (fetching) {
    return <h2 className="OpinionLoading">Loading...</h2>;
  }

  return (
    <>
      
        {lastOpinion && (
          <div className={`opinionContainer opinionContainer--${theme}`}>
            <section className="opinionCardItems opinioncard__reviews--flex">
              <a className="opinionCardItems opinioncard__reviews__averageRate"
              onClick={() => {
                opinions && displayReview(opinions);
              }}>
                {averageRate}/5
              </a>
              <div className="rate_star opinioncard__reviews__star">
                &#9733;
              </div>
            </section>
            {/* <main className="opinionCardItems">
              <section className="opinionCardItems reviews_link">
                <a
                  className="opinionCardItems opinioncard__nbReview"
                  onClick={() => {
                    opinions && displayReview(opinions);
                  }}
                >
                  {opinions &&
                    (opinions.length > 1
                      ? `${opinions.length} reviews`
                      : `${opinions.length} review`)}
                </a>
                <hr className="OpinionCard__line"></hr>
              </section>
              <section className="opinionCardItems">
                <div className="opinionCardItems OpinionCard__LastReviewTitle">
                  Last review:
                </div>
                <div className="opinionCardItems opinionCard__userName">
                  {lastOpinion.userName}
                </div>
                <div className="opinionCardItems opinioncard__rate--flex">
                  <Rate rate={lastOpinion.rate} />
                  <p className="opinionCardItems opinioncard__postDate">
                    {lastOpinion.postDate}
                  </p>
                </div>
                <textarea
                  title="View"
                  name="View"
                  className="opinionCardItems opinioncard--view"
                  value={
                    lastOpinion.view.length > 100
                      ? `${lastOpinion.view.slice(0, 100)}...`
                      : lastOpinion.view
                  }
                  readOnly
                />
              </section>
            </main> */}
          </div>
        )}
      
    </>
  );
};
