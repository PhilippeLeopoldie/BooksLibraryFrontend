import { useEffect, useState, useContext } from "react";
import { OpinionType } from "../../Type";
import url from "../../Url";
import modify from "../../media/write.svg";
import { Rate } from "./Rate/Rate";


type EditOpinion = {
  id: number,
  rate: number,
  view: string,
  userName: string,
  bookId: number
};
type BookType = {
  bookId: number;
  onEdit: (opinionToUpdate:EditOpinion) => void
};


export const Opinion = ({bookId, onEdit}: BookType) => {
  const [Opinions, setOpinions] = useState<OpinionType[] | null >(null);

  const FetchOpinions = async (bookId :number) => {
   try {
    const response : Response = await fetch(url + "api/Opinion/BookId=" + bookId);
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

  if(!Opinions) {
    return <h2 className="OpinionLoading">Loading...</h2>
  }

  return (
    <>
      <div className="opinioncontainer">
        {Opinions && Opinions.map((opinion, index) => (
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
                  const opinionToEdit:EditOpinion = {
                    id:opinion.id,
                    rate: opinion.rate,
                    view: opinion.view,
                    userName:opinion.userName,
                    bookId:opinion.bookId
                  }
                  onEdit(opinionToEdit);
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
