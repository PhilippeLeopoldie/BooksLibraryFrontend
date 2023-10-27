import { SyntheticEvent, useState, useContext } from "react";
import url from "../../Url";
import { RateClick } from "../RateClick/RateClick";
import "./OpinionEdit.css"

type EditedOpinion = {
  id:number
  rate: number,
  view: string,
  userName: string,
  bookId: number
};


type EditOpinionHandler = {
  toEdit:(opinionToUpdate:EditedOpinion) => void,
  opinion:{
    id:number,
    view:string,
    userName:string,
    rate:number,
    bookId:number,
  }
  
};

export const OpinionEdit = ({ toEdit,opinion}: EditOpinionHandler) => {
  const [updatedRate, setUpdatedRate] = useState<number>(opinion.rate);
  const handleOpinionContextRate = (newRate: number) => {
    setUpdatedRate(newRate);
  };

  const [view, setView] = useState<string>(opinion.view);
  const [userName, setUserName] = useState<string>(opinion.userName);
  const [errorDetail, setErrorDetail] = useState<string>("");

  const updateOpinion = async (e: SyntheticEvent) => {
    try {
      e.preventDefault();
      const requestOptions = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json ",
        },
        body: JSON.stringify({
          view: view,
          userName: userName,
          rate: updatedRate,
          bookId: opinion.bookId,
        }),
      };
      const response: Response = await fetch(
        url + `api/Opinion/${opinion.id}`,
        requestOptions
      );
      if (response.status === 200) {
        const opinionToEdit:EditedOpinion = {
          id:opinion.id,
          rate: updatedRate,
          view: view,
          userName:userName,
          bookId:opinion.bookId
        }
        toEdit(opinionToEdit);
      } else if (response.status === 400) {
        const errorData = await response.json();
        setErrorDetail(errorData.detail);
      }
    } catch (error: any) {
      console.error("An error occurred:", error.message);
      setErrorDetail(error.message);
    }
  };
  return (
    <>
      <form className="opinioncard">
        <textarea
          className="opinioncard___view--overflow"
          autoFocus
          placeholder="View"
          value={view}
          onChange={(e) => {
            setView(e.target.value);
            setErrorDetail("");
          }}
        />

        <input
          className="opinioncard__username"
          placeholder="Username"
          value={userName}
          onChange={(e) => {
            setUserName(e.target.value);
            setErrorDetail("")
          }}
        />
        <RateClick
          rate={updatedRate}
          HandleRate={handleOpinionContextRate}
        />

        <button
          className="button validationButton"
          onClick={(e) => updateOpinion(e)}
          type="submit"
        >
          <h2 className="validationButton__name">Save Changes</h2>
        </button>
        {errorDetail && (
          <div className="validation__errorMessage">{errorDetail}</div>
        )}
      </form>
    </>
  );
};
