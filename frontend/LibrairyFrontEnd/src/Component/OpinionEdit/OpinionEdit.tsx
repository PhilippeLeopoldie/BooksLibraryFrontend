import { SyntheticEvent, useState, useContext } from "react";
import { OpinionContext } from "../../Context";
import url from "../../Url";
import { RateClick } from "./RateClick/RateClick";

type EditOpinionHandler = {
  onEdit:()=> void;
};

export const OpinionEdit = ({ onEdit }: EditOpinionHandler) => {
  const opinionContext = useContext(OpinionContext);
  const [updatedRate, setUpdatedRate] = useState<number>(opinionContext.rate);
  const handleOpinionContextRate = (newRate: number) => {
    setUpdatedRate(newRate);
  };

  const [view, setView] = useState<string>(opinionContext.view);
  const [userName, setUserName] = useState<string>(opinionContext.userName);
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
          bookId: opinionContext.bookId,
        }),
      };
      const response: Response = await fetch(
        url + `api/Opinion/${opinionContext.id}`,
        requestOptions
      );
      if (response.status === 200) {
        onEdit();
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
          rate={opinionContext.rate}
          OpinionContextRate={handleOpinionContextRate}
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
