import React, { useEffect, useState } from "react";
import { OpinionType } from "../Type";
import FetchApi from "../FetchApi";
import like from "../media/like.png";
import sad from "../media/sad.png";
import modify from "../media/write.svg";
import OpinionUpdate from "./OpinionUpdate";

type BookType = {
  bookId: number;
};

export function FetchOpinions(props: BookType) {
  const [form, setForm] = useState<boolean>(false);
  const [Opinions, setOpinions] = useState<OpinionType[]>();
  useEffect(() => {
    FetchApi("https://bookslibrary.azurewebsites.net/api/Opinions").then(
      (opinions) => setOpinions(opinions)
    );
  }, []);
  const OppinionFiltered = Opinions?.filter(
    (opinion) => opinion.bookId == props.bookId
  );
  const activationForm = () => {
    setForm(true);
  };

  return (
    <>
      <div className="opinioncontainer">
        {OppinionFiltered?.map((opinion, index) => (
          <div className="opinioncontainer--card">
            <div className="opinionCardItems" key={index}>
              <div className="opinionCardItems opinioncard--view">
                {opinion.view}{" "}
              </div>
              <div className="opinionCardItems">{opinion.userName}</div>
              {!opinion.like && (
                <img className="img" src={sad} alt="sad" />
              )}{" "}
              {opinion.like && <img className="img" src={like} alt="like" />}
            </div>
            <div className="opinionCardItems opinioncard--footer">
              <button className="button buttonmodify" onClick={activationForm}>
                <img className="icone iconeModify" src={modify}></img>modify
              </button>
            </div>
            {form && (
              <OpinionUpdate
                opinionId={opinion.opinionId}
                view={opinion.view}
                userName={opinion.userName}
                like={opinion.like}
                bookId={opinion.bookId}
              />
            )}
          </div>
        ))}
      </div>
    </>
  );
}
