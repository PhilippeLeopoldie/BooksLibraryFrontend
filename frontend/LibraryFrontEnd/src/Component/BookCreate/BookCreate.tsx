import { useContext, useState } from "react";
import "./BookCreate.css"
import { Link } from "react-router-dom";
import url from "../../Url";
import { ThemeContext } from "../App/App";

//import "../Book/Book.css";

type FormDataType = {
  title: string;
  author: string;
};

type BookType = {
  book: {
    id: number;
    title: string;
    author: string;
  };
};

export const BookCreate = () => {
  const theme = useContext(ThemeContext);
  const [formData, setFormData] = useState<FormDataType>({
    title: "",
    author: "",
  });

  const [books, setBooks] = useState<BookType[]>([]);
  const [bookCreatedMessage, setBookCreatedMessage] = useState<boolean>(false);
  const [errorBook, setErrorBook] = useState<Boolean>(false);
  const [errorBookDetail, setErrorBookDetail] = useState<string>("");
  const [newBookId, setNewBookId] = useState<number>(0);
  const rootElement = document.documentElement;
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
      setFormData({
        title: "",
        author: ""
      })
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
      <div className={`bookCreateForm__container--${theme} bookCreateForm__container`}>
        <script>
          {theme ==="black" ? rootElement.style.backgroundColor='#000000': rootElement.style.backgroundColor='#f3f3f4'}
        </script>
        <form
          onSubmit={(e) => e.preventDefault()}
          action={url + "api/Book"}
          method="POST"
          className="bookCreateForm"
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

          <div className="bookCreateForm__output">
            {errorBook && (
              <div className="validation__errorMessage">{errorBookDetail}</div>
            )}
          </div>
          <button
            className="button bookCreateForm__postButton"
            onClick={async () => {
              await PostBook();
            }}
          >
            Create book
          </button>
          {bookCreatedMessage && (
            <div className="bookCreateForm__outpout__card">
              <div className="bookCreateForm__output">Book created!</div>
              <Link to="/">
                <h2 className="bookCreateForm__output__backToHome">back to Home</h2>
              {/* <img className="nav-link nav__HomeIcone" src={homeIcone} alt="Home"></img> */}
              </Link>
            </div>
            
          )}
          {/* <OpinionCreate bookId={newBookId}/> */}
        </form>
      </div>
    </>
  );
};
