import React, { useEffect, useState } from "react";
import { OpinionType } from "../Type";
import FetchApi from "../FetchApi";
import like from "../media/like.png";
import sad from "../media/sad.png";
import write from "../media/write.png";
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
      <div className="opinioncard">
        {OppinionFiltered?.map((opinion, index) => (
          <div>
            <div key={index}>
              <div>{opinion.view} </div> <div> {opinion.userName}</div>
              {!opinion.like && <img src={sad} alt="sad" />}{" "}
              {opinion.like && <img src={like} alt="like" />}
            </div>
            <button onClick={activationForm}>
              <img src={write}></img>
            </button>
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
