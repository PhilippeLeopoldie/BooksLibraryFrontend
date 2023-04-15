import React, { useEffect, useState, useContext } from "react";
import { BrowserRouter, useNavigate } from "react-router-dom";
import Home from "./Home";
import { OpinionType, OpinionUpdateType } from "../Type";
import FetchApi from "../FetchApi";
import love from "../media/love.png";
import sad from "../media/sad.png";
import modify from "../media/write.svg";
import OpinionUpdate from "./OpinionUpdate";
import { OpinionContext } from "../Context";

type BookType = {
  bookId: number;
};

export function FetchOpinions(prop: BookType) {
  const opinionToUpdate = useContext(OpinionContext);
  const navigate = useNavigate();
  const [form, setForm] = useState<boolean>(false);
  const [Opinions, setOpinions] = useState<OpinionType[]>();
  useEffect(() => {
    FetchApi("https://bookslibrary.azurewebsites.net/api/Opinions").then(
      (opinions) => setOpinions(opinions)
    );
  }, []);
  const OppinionFiltered = Opinions?.filter(
    (opinion) => opinion.bookId == prop.bookId
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
              {opinion.like && <img className="img" src={love} alt="like" />}
            </div>
            <div className="opinionCardItems opinioncard--footer">
              <button
                className="button buttonmodify"
                onClick={() => {
                  (opinionToUpdate!.bookId = opinion.bookId),
                    (opinionToUpdate!.opinionId = opinion.opinionId),
                    (opinionToUpdate!.userName = opinion.userName),
                    (opinionToUpdate!.view = opinion.view),
                    (opinionToUpdate!.like = opinion.like);

                  navigate("/viewUpdate");

                  /* setForm(true);
                  {form && (
                    <OpinionUpdate
                      opinionId={opinion.opinionId}
                      view={opinion.view}
                      userName={opinion.userName}
                      like={opinion.like}
                      bookId={opinion.bookId}
                    />
                  )} */
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
