import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { OpinionType } from "../../Type";
import FetchApi from "../../FetchApi";
import url from "../../Url";
import love from "../../media/love.png";
import sad from "../../media/sad.png";
import modify from "../../media/write.svg";
import { OpinionContext } from "../../Context";

type BookType = {
  bookId: number;
};

export function FetchOpinions({bookId}: BookType) {
  const opinionToUpdate = useContext(OpinionContext);
  const navigate = useNavigate();
  const [Opinions, setOpinions] = useState<OpinionType[]>([]);
  useEffect(() => {
    FetchApi(url + "api/Opinion/" + bookId)
      .then((response) => {
        console.log("Opinions response:", response);

        setOpinions(response.$values);
      })
      .catch((error) => {
        console.error("Opinions error:", error);
      });
  }, []);

  console.log("Opinions", { Opinions });
  console.log("bookId", { bookId });

  return (
    <>
      <div className="opinioncontainer">
        {Opinions?.map((opinion, index) => (
          <div className="opinioncontainer--card">
            <div className="opinionCardItems" key={opinion.bookId}>
              <textarea
                className="opinionCardItems opinioncard--view"
                value={opinion.view}
                readOnly
              />
              <div className="opinionCardItems">{opinion.userName}</div>
              {opinion.rate == 0 && <img className="img" src={sad} alt="sad" />}
              {opinion.rate == 1 && <img className="img" src={love} alt="rate" />}
            </div>
            <div className="opinionCardItems opinioncard--footer">
              <button
                className="button opinioncard--buttonmodify"
                onClick={() => {
                  (opinionToUpdate!.bookId = opinion.bookId),
                  (opinionToUpdate!.id = opinion.id),
                  (opinionToUpdate!.userName = opinion.userName),
                  (opinionToUpdate!.view = opinion.view),
                  (opinionToUpdate!.rate = opinion.rate);

                  navigate("/viewUpdate");
                }}
                /*disabled*/
              >
                <img className="icone iconeModify" src={modify}></img>
                modify
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
