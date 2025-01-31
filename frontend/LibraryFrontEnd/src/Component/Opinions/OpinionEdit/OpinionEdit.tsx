import { SyntheticEvent, useState, useContext } from "react";
import { OPINION_URL } from "../../../constants/api";
import { ReviewType } from "../../../constants/types";
import { RateClick } from "../../Rates/RateClick/RateClick";
import "./OpinionEdit.css"


type EditReviewHandler = {
    toEdit: (opinionToUpdate: ReviewType) => void,
    opinion: ReviewType
};

export const OpinionEdit = ({ toEdit,opinion}: EditReviewHandler) => {
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
        OPINION_URL + opinion.id,
        requestOptions
      );
      if (response.status === 200) {
        const opinionToEdit:ReviewType = {
            id:opinion.id,
            rate: updatedRate,
            view: view,
            userName:userName,
            bookId: opinion.bookId,
            postDate: opinion.postDate
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
