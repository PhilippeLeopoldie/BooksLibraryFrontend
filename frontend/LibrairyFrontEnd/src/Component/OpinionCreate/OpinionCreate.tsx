import React, { useState } from "react";
import url from "../../Url";
import { RateClick } from "../OpinionEdit/RateClick/RateClick";

type AddOpinionType = {
  bookId: number;
};

type FormDataType = {
  view: string;
  userName: string;
  rate: number;
};

export const OpinionCreate = ({ bookId }: AddOpinionType) => {
  const [bookCreatedMessage, setBookCreatedMessage] = useState<boolean>(false);
  const [errorOpinion, setErrorOpinion] = useState<boolean>(false);
  const [errorOpinionDetail, setErrorOpinionDetail] = useState<string>("");

  const [formData, setFormData] = useState<FormDataType>({
    view: "",
    userName: "",
    rate: 0,
  });

  const HandleFormDataRate = (newRate: number) => {
    setFormData({ ...formData, rate: newRate });
  };

  const PostOpinion = async (bookId: number) => {
    console.log("bookid", bookId);
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        bookId,
        rate: formData.rate,
        view: formData.view,
        userName: formData.userName,
      }),
    };
    const opinionResponse: Response = await fetch(
      url + "api/Opinion",
      requestOptions
    );
    if (opinionResponse.status === 201) {
      const newOpinion = await opinionResponse.json();
      setBookCreatedMessage(true);
      setErrorOpinion(false);
      return newOpinion;
    } else if (opinionResponse.status === 400) {
      const errorData = await opinionResponse.json();
      setBookCreatedMessage(false);
      setErrorOpinion(true);
      setErrorOpinionDetail(errorData.detail);
    }
  };

  const HideBookCreatedMessage = () => {
    setBookCreatedMessage(false);
  };
  const HideErrorDetail = () => {
    setErrorOpinion(false);
  };
  const HandleInputChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    bookCreatedMessage && HideBookCreatedMessage();
    errorOpinion && HideErrorDetail();
  };

  return (
    <>
      <textarea
        className="opinionForm__view input"
        placeholder="View"
        name="view"
        value={formData.view}
        onChange={(e) => HandleInputChange(e)}
      />

      <input
        className="input"
        placeholder="UserName"
        name="userName"
        value={formData.userName}
        onChange={(e) => HandleInputChange(e)}
      />
      <RateClick rate={formData.rate} HandleRate={HandleFormDataRate} />
      <button
        className="button bookForm__postButton"
        onClick={async () => {
          await PostOpinion(bookId);
        }}
      >
        Post review
      </button>
      {errorOpinion && (
        <div className="validation__errorMessage">{errorOpinionDetail}</div>
      )}
      {bookCreatedMessage && (
        <h1 className="bookform__output">Review posted!</h1>
      )}
    </>
  );
}

export default OpinionCreate;
