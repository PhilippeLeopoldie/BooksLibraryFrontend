import { useState } from "react";
import { BookType } from "../../Type";
import url from "../../Url";
import "../Book/Book.css";
import OpinionCreate from "../OpinionCreate/OpinionCreate";

type FormDataType = {
  title: string,
  author: string,
};


export const AddBook = () => {
  const [formData, setFormData] = useState<FormDataType>({
    title: "",
    author: "",
  });

  const [books, setBooks] = useState<BookType[]>([]);
  const [bookCreatedMessage, setBookCreatedMessage] = useState<boolean>(false);
  const [errorBook, setErrorBook] = useState<Boolean>(false);
  const [errorBookDetail, setErrorBookDetail] = useState<string>("");
  const [newBookId, setNewBookId] = useState<number>(0); 
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
    const bookResponse: Response = await fetch(
      url + "api/Book",
      requestOptions
    );
    if (bookResponse.status === 201) {
      setErrorBook(false);
      const body = await bookResponse.json();
      setNewBookId(body.id);
      setBooks((books) => [...books, body]);
      setBookCreatedMessage(true);
      return body;
    } else if (bookResponse.status === 400) {
      setErrorBook(true);
      const errorData = await bookResponse.json();
      setErrorBookDetail(errorData.detail);
    }
  };
  const HideBookCreatedMessage = () => {
    setBookCreatedMessage(false);
  };

  const HideErrorDetail = () => {
    setErrorBook(false);
  };

  const HandleInputChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    bookCreatedMessage && HideBookCreatedMessage();
    errorBook && HideErrorDetail();
  };

  return (
    <>
      <form
        onSubmit={(e) => e.preventDefault()}
        action={url + "api/Book"}
        method="POST"
        className="bookForm"
      >
        
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
        
        <div className="bookform__output">
          {errorBook && (
            <div className="validation__errorMessage">{errorBookDetail}</div>
          )}
          
        </div>
        <button
          className="button bookForm__postButton"
          onClick={async () => {
            await PostBook();
          }}
        >
          Create book
        </button>
        {bookCreatedMessage && (
          <h1 className="bookform__output">Book created!</h1>
        )}
        {/* <OpinionCreate bookId={newBookId}/> */}
      </form>
    </>
  );
};
