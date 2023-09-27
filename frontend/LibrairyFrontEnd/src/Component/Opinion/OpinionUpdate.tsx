import { SyntheticEvent, useState, useContext } from "react";
import { OpinionContext } from "../../Context";
import check from "../../media/check.png";
import url from "../../Url";
import { RateClick } from "./Rate/RateClick";
import { useNavigate } from "react-router";

function OpinionUpdate() {
  const opinionContext = useContext(OpinionContext);
  const navigate = useNavigate()
  const [updatedRate, setUpdatedRate] = useState<number>(opinionContext.rate)
  const handleOpinionContextRate = (newRate: number) => {
    setUpdatedRate(newRate)
  }

  const [view, setView] = useState<string>(opinionContext.view);
  const [userName, setUserName] = useState<string>(opinionContext.userName);
   const [errorDetail, setErrorDetail] = useState<string>("");

  const updateOpinion = async (e: SyntheticEvent) => {
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
    await fetch(
      url+`api/Opinion/${opinionContext.id}`,
      requestOptions
    ).then((response: Response) => {
      if(response.ok) navigate("/");
      response.json().then((response) => {
        if(response.message) setErrorDetail(response.detail);
      });
    });
  };
  console.log("opinion object", { opinion: opinionContext });
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
        <RateClick rate={opinionContext.rate} OpinionContextRate={handleOpinionContextRate}/>

        <button
          className="button validation"
          onClick={(e)=> {
            updateOpinion(e);
            
          }}
          type="submit"
        >
          Validation
          <img className="icone" src={check} />
        </button>
        { errorDetail && <div className="validation__errorMessage">{errorDetail}</div>
          
        }
      </form>
    </>
  );
}

export default OpinionUpdate;
