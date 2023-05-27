import { SyntheticEvent, useState, useContext } from "react";
import { OpinionContext } from "../Context";
import check from "../media/check.png";


function OpinionUpdate() {
  const opinionUpdated = useContext(OpinionContext);

  const [view, setView] = useState<string>(opinionUpdated.view);
  const [userName, setUserName] = useState<string>(opinionUpdated.userName);


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
        like: opinionUpdated.like,
        bookId: opinionUpdated.bookId,
      }),
    };
    await fetch(
      `https://booklibray-backend.herokuapp.com/api/Opinion/${opinionUpdated.opinionId}`,
      requestOptions
    ).then((response) => {
      response.json().then(() => {
        window.location.reload();
      });
    });
  };

  return (
    <>
      <form className="opinioncard">
        
          
          <textarea
          className="opinioncard___view--overflow"
            autoFocus
            placeholder="View"
            value={view}
            onChange={(e) => setView(e.target.value)}
          />
        
        
        
          <input
            className="opinioncard__username"
            placeholder="Username"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        
        <button className="button validation" onClick={updateOpinion} type="submit" onSubmit={()=>{<p>validated!</p>}}>
          Validation<img className="icone" src={check} />
        </button>
      </form>
    </>
  );
}

export default OpinionUpdate;
