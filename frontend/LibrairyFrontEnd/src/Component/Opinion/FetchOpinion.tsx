import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { OpinionType } from "../../Type";
import FetchApi from "../../FetchApi";
import url from "../../Url";
import modify from "../../media/write.svg";
import { OpinionContext } from "../../Context";
import { Rate } from "./Rate/Rate";

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
        setOpinions(response.$values);
      })
      .catch((error) => {
        console.error("Opinions error:", error);
      });
  }, []);

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
              <Rate rate= {opinion.rate}/>
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
