import { useEffect, useState, useContext } from "react";
import "./Opinion.css"
import { OpinionType } from "../../Type";
import url from "../../Url";
import modify from "../../media/write.svg";
import { Rate } from "./Rate/Rate";




type Opinion = {
  id: number,
  rate: number,
  view: string,
  userName: string,
  postDate: string,
  bookId: number
};

type BookType = {
  book: {
    id:number,
    title:string,
    author:string
  }
  onEdit?: (opinionToUpdate:Opinion) => void
  toCreate: ()=> void
};


export const Opinion = ({book, onEdit, toCreate}: BookType) => {
  const [opinions, setOpinions] = useState<Opinion[] | null >(null);
  const [fetching, setFething] = useState<boolean>(true);
  const [lastOpinion, setLastOpinion] = useState<Opinion | null>(null);
  const FetchOpinions = async (bookId :number) => {
   try {
    const response : Response = await fetch(url + "api/Opinion/BookId=" + bookId);
    if(response.status === 200) {
      const responseData = await response.json();
        setOpinions(responseData.$values)
        setFething(false)
    } else if (response.status === 404){
      setFething(false)
      console.log("404 response",response)
    }
   } catch (error) {
    console.error("error fetching Opinions:", error);
   }
  } 

  useEffect(() => {
    FetchOpinions(book.id);
  }, []);

  useEffect(()=> {
    opinions && opinions.length > 0 && setLastOpinion(opinions[opinions.length-1])
  },[opinions])
  
  if(fetching) {
    return <h2 className="OpinionLoading">Loading...</h2>
  }

  return (
    <>
      <div className="opinioncontainer">
        {lastOpinion && (
          <div className="opinioncontainer--card" key={lastOpinion.id}>
            <div className="opinionCardItems" >
              <textarea
                className="opinionCardItems opinioncard--view"
                value={lastOpinion.view}
                readOnly
              />
              <div className="opinionCardItems">{lastOpinion.userName}</div>
              <Rate rate= {lastOpinion.rate}/>
            </div>
            {/* <div className="opinionCardItems opinioncard--footer">
              <button
                className="button opinioncard--buttonmodify"
                onClick={() => {
                  const opinionToEdit:EditOpinion = {
                    id:lastOpinion.id,
                    rate: lastOpinion.rate,
                    view: lastOpinion.view,
                    userName:lastOpinion.userName,
                    bookId:lastOpinion.bookId
                  }
                  onEdit && onEdit(opinionToEdit);
                }}
              >
                <img className="icone iconeModify" src={modify}></img>
                modify
              </button>
              <button className="button opinioncard--createButton"
                onClick={()=> {
                  toCreate();
                }}
              >
                Rate this book
              </button>
            </div> */}
          </div>
        )}
      </div>
    </>
  );
}
