import { useEffect, useState, useContext } from "react";
import "./Opinion.css";
import { OpinionList } from "../OpinionList/OpinionList";
import url from "../../Url";
import modify from "../../media/write.svg";
import { Rate } from "../Rate/Rate";

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
  const [opinions, setOpinions] = useState<OpinionType[] | null>(null);
  const [fetching, setFething] = useState<boolean>(true);
  const [lastOpinion, setLastOpinion] = useState<OpinionType | null>(null);
  const [averageRate, setAverageRate] = useState<number>(0);
  const FetchOpinions = async (bookId: number) => {
    try {
      const response: Response = await fetch(
        url + "api/Opinion/BookId=" + bookId
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
    FetchOpinions(book.id);
  }, []);

  useEffect(() => {
    opinions &&
      opinions.length > 0 &&
      setLastOpinion(opinions[opinions.length - 1]);
    AverageRate();
    console.log("average rate: ", averageRate);
  }, [opinions]);

  if (fetching) {
    return <h2 className="OpinionLoading">Loading...</h2>;
  }

  return (
    <>
      <div className="opinioncontainer">
        {lastOpinion && (
          <div className="opinioncontainer--card" key={lastOpinion.id}>
            <div className="opinionCardItems">
              <div className="opinionCardItems opinioncard__reviews--flex">
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
                <div className="opinionCardItems opinioncard__reviews__averageRate">
                  {averageRate}
                </div>
                <div className="rate_star opinioncard__reviews__star">
                  &#9733;
                </div>
              </div>
              <hr className="OpinionCard__line"></hr>
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
                className="opinionCardItems opinioncard--view"
                value={
                  lastOpinion.view.length > 150
                    ? `${lastOpinion.view.slice(0, 110)}...`
                    : lastOpinion.view
                }
                readOnly
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};
