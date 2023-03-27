import React, { useEffect, useState } from "react";
import { BookType } from "../Type";
import FetchApi from "../FetchApi";
import like from "../like.png";
import sad from "../sad.png";

function AddBook() {
  const [title, setTitle] = useState<string>("");
  const [Author, setAuthor] = useState<string>("");
  const [View, setView] = useState<string>("");
  const [userName, setUserName] = useState<string>("");

  const [books, setBooks] = useState<BookType[]>();
  const [bookTitle, setBookTitle] = useState<BookType[]>();

  const PostBook = async () => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: title, author: Author }),
    };
    const body = await (
      await fetch(
        "https://bookslibrary.azurewebsites.net/api/Books",
        requestOptions
      )
    ).json();
    books?.push(body);
    setBooks(books);
    return body;
  };

  useEffect(() => {
    FetchApi("https://bookslibrary.azurewebsites.net/api/Books").then((books) =>
      setBooks(books)
    );
  }, []);
  console.log("list books:", books);

  useEffect(() => {
    setBookTitle(books?.filter((book) => book.title == title));
  }, []);
  console.log("listBookTitle", bookTitle);

  const PostOpinion = async (bookId: number, opinion: boolean) => {
    console.log("My number brings all the opinions to the yard", bookId);
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        bookId,
        like: opinion,
        view: View,
        userName: userName,
      }),
    };
    console.log("post opinion:", requestOptions);
    const newOpinion = await (
      await fetch(
        "https://bookslibrary.azurewebsites.net/api/Opinions",
        requestOptions
      )
    ).json();
  };

  return (
    <>
      <form
        onSubmit={(e) => e.preventDefault()}
        action="https://bookslibrary.azurewebsites.net/api/Books"
        method="POST"
        className="bookform"
      >
        <div className="bookform--inputs">
          <input
            placeholder="Title"
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            placeholder="Author"
            onChange={(e) => setAuthor(e.target.value)}
          />
          <input className="bookform--view" placeholder="View" onChange={(e) => setView(e.target.value)} />
          <input
            placeholder="UserName"
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>

        <div>
          <button
            onClick={async () => {
              PostOpinion((await PostBook()).bookId, true);
              window.location.reload();
            }}
          >
            <img src={sad} />
          </button>
          <button
            type="submit"
            onClick={async () => {
              PostOpinion((await PostBook()).bookId, false);
              window.location.reload();
            }}
          >
            <img src={like} />
          </button>
        </div>
      </form>
    </>
  );
}

export default AddBook;
