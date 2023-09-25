import { useEffect, useState } from "react";
import { BookType } from "../../Type";
import FetchApi from "../../FetchApi";
import url from "../../Url";
import love from "../../media/love.png";
import sad from "../../media/sad.png";
import "./Book.css";

function AddBook() {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    view: "",
    userName: "",
    rate:""
  });
  const [books, setBooks] = useState<BookType[]>([]);
  const [bookCreatedMessage, setBookCreatedMessage] = useState<boolean>(false);

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
    const response = await fetch(url + "api/Book", requestOptions);
    const body = await response.json();
    console.log("postBook bodyId:", body.id);
    setBooks((books) => [...books, body]);
    return body;
  };
  const fetchBooks = async () => {
    try {
      const booksData = await FetchApi(url + "api/Book");
      setBooks(booksData.$values);
    } catch (error) {
      console.error("error fetching books:", error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

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
    const OpinionResponse = await fetch(url + "api/Opinion", requestOptions);
    const newOpinion = await OpinionResponse.json();

    // clear the form fields after submitting
    setFormData({
      title: "",
      author: "",
      view: "",
      userName: "",
      rate:""
    });
    setBookCreatedMessage(true);
    return newOpinion;
  };
  const HideBookCreatedMessage = () => {
    setBookCreatedMessage(false);
  };
  const HandleInputChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    bookCreatedMessage && HideBookCreatedMessage();
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

          <input
            type="number"
            className="input"
            placeholder ="Rate"
            name="rate"
            value={formData.rate}
            onChange={(e) => HandleInputChange(e)}
          />
        </div>

        <div>
          <button
            className="button bookform__button"
            onClick={async () => {
              PostOpinion((await PostBook()).id);
            }}
          >
            <img className="icone iconeRate" src={sad} />
            Dislike
          </button>

          <button
            className="button bookform__button"
            type="submit"
            onClick={async () => {
              PostOpinion((await PostBook()).id);
            }}
          >
            <img className="icone iconeRate" src={love} />
            Like
          </button>
        </div>
        <div className="bookform__output">
          {bookCreatedMessage && <h1 className="bookform__output">Book created!</h1>}
        </div>
      </form>
      {/* <Books /> */}
    </>
  );
}

export default AddBook;
