import React, { useState } from "react";
import url from "../../Url";
import { RateClick } from "../RateClick/RateClick";
import "./OpinionCreate.css";

type AddOpinionType = {
  book?: {
    id: number;
    title: string;
    author: string;
  };
  toCreate: () => void;
};

type FormDataType = {
  view: string;
  userName: string;
  rate: number;
};

export const OpinionCreate = ({ book, toCreate }: AddOpinionType) => {
  const [bookCreatedMessage, setBookCreatedMessage] = useState<boolean>(false);
  const [errorOpinion, setErrorOpinion] = useState<boolean>(false);
  const [errorOpinionDetail, setErrorOpinionDetail] = useState<string>("");
  const [rateText, setRateText] = useState<string>("");
  const [formData, setFormData] = useState<FormDataType>({
    view: "",
    userName: "",
    rate: 0,
  });

  const RateTextConvertor = (rate: number) => {
    let rateText="";
    switch (rate) {
      case 1:
        rateText = "Very bad";
        break;
      case 2:
        rateText = "Bad";
        break;
      case 3:
        rateText = "Good";
        break;
      case 4:
        rateText = "Very Good";
        break;
      case 5:
        rateText = "Excellent";
        break;
    }
    setRateText(rateText);
  };

  const HandleFormDataRate = (newRate: number) => {
    setFormData({ ...formData, rate: newRate });
    RateTextConvertor(newRate);
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
      toCreate();
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
      <div className="opinionCreate opinionCreateCard">
        <h2 className="opinionCreate opinionCreate__booktitle">{book?.title}</h2>
        <h3 className="opinionCreate opinionCreate__bookauthor">by: {book?.author}</h3>
        <RateClick rate={formData.rate} HandleRate={HandleFormDataRate} />
        <div className="opinionCreate opinionCreate__rateText">
          {rateText}
        </div>
        <textarea
          className="opinionForm__view"
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
        {errorOpinion && (
          <div className="opinionCreate validation__errorMessage">{errorOpinionDetail}</div>
        )}
        <div className="opinionCreate opinionForm__footer">
          <button
            className="button opinionForm__cancelButon"
            onClick={() => {
              toCreate();
            }}
          >
            Cancel
          </button>
          <button
            className="button opinionForm__postButton"
            onClick={async () => {
              book && book.id && (await PostOpinion(book.id));
            }}
          >
            Post
          </button>
        </div>
      </div>
    </>
  );
};

