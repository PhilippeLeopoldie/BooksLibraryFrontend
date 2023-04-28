import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { OpinionType } from "../Type";
import FetchApi from "../FetchApi";
import love from "../media/love.png";
import sad from "../media/sad.png";
import modify from "../media/write.svg";
import { OpinionContext } from "../Context";

type BookType = {
  bookId: number;
};

export function FetchOpinions(prop: BookType) {
  const { bookId } = prop;
  const opinionToUpdate = useContext(OpinionContext);
  const navigate = useNavigate();
  const [Opinions, setOpinions] = useState<OpinionType[]>();
  useEffect(() => {
    FetchApi("http://localhost:5133/api/Opinions").then(
      (opinions) => setOpinions(opinions)
    );
  }, []);
  const OpinionFiltered = Opinions?.filter(
    (opinion) => opinion.bookId == bookId
  );

  return (
    <>
      <div className="opinioncontainer">
        {OpinionFiltered?.map((opinion, index) => (
          <div className="opinioncontainer--card">
            <div className="opinionCardItems" key={index}>
              <textarea className="opinionCardItems opinioncard--view"
                value={opinion.view}
                readOnly
              />
              <div className="opinionCardItems">{opinion.userName}</div>
              {!opinion.like && (
                <img className="img" src={sad} alt="sad" />
              )}{" "}
              {opinion.like && <img className="img" src={love} alt="like" />}
            </div>
            <div className="opinionCardItems opinioncard--footer">
              <button
                className="button opinioncard--buttonmodify"
                onClick={() => {
                  (opinionToUpdate!.bookId = opinion.bookId),
                    (opinionToUpdate!.opinionId = opinion.opinionId),
                    (opinionToUpdate!.userName = opinion.userName),
                    (opinionToUpdate!.view = opinion.view),
                    (opinionToUpdate!.like = opinion.like);

                  navigate("/viewUpdate");
                }}
              >
                <img className="icone iconeModify" src={modify}></img>modify
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
