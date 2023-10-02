import { useState } from "react";
import { BookType } from "../../Type";
import url from "../../Url";
import "../Book/Book.css";
import { RateClick } from "../OpinionEdit/RateClick/RateClick";

type FormDataType = {
  title: string,
  author: string,
  view: string,
  userName: string,
  rate:number
}

export const AddBook = () => {
  const [formData, setFormData] = useState<FormDataType>({
    title: "",
    author: "",
    view: "",
    userName: "",
    rate:0
  });

  const HandleFormDataRate = (newRate : number) => {
    setFormData({...formData, rate : newRate})
  }
  const [books, setBooks] = useState<BookType[]>([]);
  const [bookCreatedMessage, setBookCreatedMessage] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [errorDetail, setErrorDetail] = useState<string>("");

  const PostBook = async () => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: formData.title,
        author: formData.author,
      }),
    };
    const bookResponse : Response = await fetch(url + "api/Book", requestOptions);
    const body = await bookResponse.json();
    console.log("postBook bodyId:", body.id);
    setBooks((books) => [...books, body]);
    return body;
  };

  const PostOpinion = async (bookId: number) => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        bookId,
        rate:formData.rate,
        view: formData.view,
        userName: formData.userName,
      }),
    };
    const OpinionResponse :Response = await fetch(url + "api/Opinion", requestOptions);
    if(OpinionResponse.status === 201) {
      const newOpinion = await OpinionResponse.json();
      
      // clear the form fields after submitting
      setFormData({
        title: "",
        author: "",
        view: "",
        userName: "",
        rate:0
      });
      setBookCreatedMessage(true);
      setError(false)
      return newOpinion;
    } else if (OpinionResponse.status === 400) {
      const errorData = await OpinionResponse.json();
      setBookCreatedMessage(false);
      setError(true)
      setErrorDetail(errorData.detail);
    }
  };

  const HideBookCreatedMessage = () => {
    setBookCreatedMessage(false);
  };

  const HideErrorDetail = () => {
    setError(false);
  }
  
  const HandleInputChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    bookCreatedMessage && HideBookCreatedMessage();
    error && HideErrorDetail();
  };

  return (
    <>
      <form
        onSubmit={(e) => e.preventDefault()}
        action={url + "api/Book"}
        method="POST"
        className="bookform"
      >
        <div className="bookform__inputs">
          <input
            className="input"
            placeholder="Title"
            name="title"
            value={formData.title}
            onChange={(e) => HandleInputChange(e)}
          />

          <input
            className="input"
            placeholder="Author"
            name="author"
            value={formData.author}
            onChange={(e) => HandleInputChange(e)}
          />

          <textarea
            className="bookform__view input"
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
        </div>
        <RateClick rate = {formData.rate} HandleRate={HandleFormDataRate}/>

        <div>
          <button
            className="button bookform__button"
            onClick={async () => {
              PostOpinion((await PostBook()).id);              
            }}
          >
            Post
          </button>
        </div>
        <div className="bookform__output">
          {bookCreatedMessage && <h1 className="bookform__output">Book created!</h1>}
          {error && (
          <div className="validation__errorMessage">{errorDetail}</div>
        )}
        </div>
      </form>
    </>
  );
}