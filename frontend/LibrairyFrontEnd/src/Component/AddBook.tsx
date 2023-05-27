import { useEffect, useState } from "react";
import { BookType } from "../Type";
import FetchApi from "../FetchApi";
import love from "../media/love.png";
import sad from "../media/sad.png";
import './Book.css'

function AddBook() {
  const [title, setTitle] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [view, setView] = useState<string>("");
  const [userName, setUserName] = useState<string>("");

  const [books, setBooks] = useState<BookType[]>();
  const [bookTitle, setBookTitle] = useState<BookType[]>();
  let count: number = 0;

  const PostBook = async () => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: title, author: author }),
    };
    const body = await (
      await fetch(
        "https://booklibray-backend.herokuapp.com/api/Book",
        requestOptions
      )
    ).json();
    books?.push(body);
    setBooks(books);
    count++;
    console.log("count:", count);

    return body;
  };

  useEffect(() => {
    FetchApi("https://booklibray-backend.herokuapp.com/api/Book").then((books) =>
      setBooks(books)
    );
  }, [count]);

  useEffect(() => {
    setBookTitle(books?.filter((book) => book.title == title));
  }, []);

  const PostOpinion = async (bookId: number, opinion: number) => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        bookId,
        like: opinion,
        view: view,
        userName: userName,
      }),
    };
    const newOpinion = await (
      await fetch(
        "https://booklibray-backend.herokuapp.com/api/Opinion",
        requestOptions
      )
    )
      .json()
     
  };

  return (
    <>
      <form
        onSubmit={(e) => e.preventDefault()}
        action="https://booklibray-backend.herokuapp.com/api/Book"
        method="POST"
        className="bookform"
      >
        <div className="bookform__inputs">
          <input
            className="input"
            placeholder="Title"
            onChange={(e) => setTitle(e.target.value)}
          />
          
          <input
            className="input"
            placeholder="Author"
            onChange={(e) => setAuthor(e.target.value)}
          />
          
          <textarea
            className="bookform__view input"
            placeholder="View"
            onChange={(e) => setView(e.target.value)}
          />
          
          <input
            className="input"
            placeholder="UserName"
            onChange={(e) => setUserName(e.target.value)}
          />
          
        </div>

        <div>
          <button
            className="button bookform__button"
            onClick={async () => {
              PostOpinion((await PostBook()).bookId, 0)
            }}
          >
            Add
            <img className="icone iconeSad" src={sad} />
          </button>

          <button
            className="button bookform__button"
            type="submit"
            onClick={async () => {
              PostOpinion((await PostBook()).bookId, 1);
            }}
          >
            Add
            <img className="icone iconeLike" src={love} />
          </button>
        </div>
      </form>
      {/* <Books /> */}
    </>
  );
}

export default AddBook;
