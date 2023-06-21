import { SyntheticEvent, useState, useContext } from "react";
import { OpinionContext } from "../Context";
import check from "../media/check.png";

function OpinionUpdate() {
  const opinion = useContext(OpinionContext);

  const [view, setView] = useState<string>(opinion.view);
  const [userName, setUserName] = useState<string>(opinion.userName);

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
        like: opinion.like,
        bookId: opinion.bookId,
      }),
    };
    console.log("opinionId:", `${opinion.opinionId}`);
    console.log("view:", `${opinion.view}`);
    console.log("userName:", `${opinion.userName}`);
    await fetch(
      `https://leopoldie-booklibrary-backend.herokuapp.com/api/Opinion/${opinion.opinionId}`,
      requestOptions
    ).then((response) => {
      console.log("response", `${response}`);
      console.log("requestOption", { requestOptions });
      response.json().then(() => {});
    });
  };
  console.log("opinion object", { opinion });
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

        <button
          className="button validation"
          onClick={updateOpinion}
          type="submit"
          onSubmit={() => {
            <p>validated!</p>;
          }}
        >
          Validation
          <img className="icone" src={check} />
        </button>
      </form>
    </>
  );
}

export default OpinionUpdate;
