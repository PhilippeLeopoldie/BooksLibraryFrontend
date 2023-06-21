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
  const [Opinions, setOpinions] = useState<OpinionType[]>([]);
  useEffect(() => {
    FetchApi("https://leopoldie-booklibrary-backend.herokuapp.com/api/Opinion")
      .then((response) => {
        console.log("Opinions response:", response);
        setOpinions(response.$values);
      })
      .catch((error) => {
        console.error("Opinions error:", error);
      });
  }, []);
  const opinionFiltered = Opinions?.filter(
    (opinion) => opinion.bookId === bookId
  );

  console.log("Opinions",{Opinions});
  console.log("bookId",{bookId});
  console.log("FilteredOpinions:", {opinionFiltered});

  return (
    <>
      <div className="opinioncontainer">
        {opinionFiltered?.map((opinion,index) => (
          <div className="opinioncontainer--card">
            <div className="opinionCardItems" key={opinion.bookId}>
              <textarea
                className="opinionCardItems opinioncard--view"
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
                }} disabled
              >
                <img className="icone iconeModify" src={modify}></img>disabled modify 
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
