import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { OpinionType } from "../../Type";
import url from "../../Url";
import modify from "../../media/write.svg";
import { OpinionContext } from "../../Context";
import { Rate } from "./Rate/Rate";

type BookType = {
  bookId: number;
  onEdit: () => void
};

export const Opinion = ({bookId, onEdit}: BookType) => {
  const opinionToUpdate = useContext(OpinionContext);
  const [Opinions, setOpinions] = useState<OpinionType[]>([]);

  const FetchOpinions = async (bookId :number) => {
   try {
    const response : Response = await fetch(url + "api/Opinion/" + bookId);
    if(response.status === 200) {
      const responseData = await response.json();
        setOpinions(responseData.$values)
    } else if (response.status === 404){
      console.log(response)
    }
   } catch (error) {
    console.error("An error occurred:", error);
   }
  } 


  useEffect(() => {
    FetchOpinions(bookId);
  }, []);

  return (
    <>
      <div className="opinioncontainer">
        {Opinions?.map((opinion, index) => (
          <div className="opinioncontainer--card" key={opinion.id}>
            <div className="opinionCardItems" >
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
                  onEdit();
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
