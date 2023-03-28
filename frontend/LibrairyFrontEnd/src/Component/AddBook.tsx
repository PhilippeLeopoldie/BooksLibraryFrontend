import React, { useEffect, useState } from "react";
import { render } from 'react-dom';
import { BookType } from "../Type";
import Books from "./Books";
import FetchApi from "../FetchApi";
import like from "../media/like.png";
import sad from "../media/sad.png";

function AddBook() {
  const [title, setTitle] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [view, setView] = useState<string>("");
  const [userName, setUserName] = useState<string>("");

  const [books, setBooks] = useState<BookType[]>();
  const [bookTitle, setBookTitle] = useState<BookType[]>();
 let count:number = 0;

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
        "https://bookslibrary.azurewebsites.net/api/Books",
        requestOptions
      )
    ).json();
    books?.push(body);
    setBooks(books);
    count++;
    console.log('count:',count)
   
    return body;
  };

  useEffect(() => {
    FetchApi("https://bookslibrary.azurewebsites.net/api/Books").then((books) =>
      setBooks(books)
    );
  }, [count]);


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
        view: view,
        userName: userName,
      }),
    };
    const newOpinion = await (
      await fetch(
        "https://bookslibrary.azurewebsites.net/api/Opinions",
        requestOptions
      )
    ).json().then(()=>{window.location.reload();});

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

              PostOpinion((await PostBook()).bookId, false);
              
            }}
          >
            <img src={sad} />
          </button>
          <button
            type="submit"
            onClick={async () => {
              PostOpinion((await PostBook()).bookId, true);
             // window.location.reload();
            }}
          >
            <img src={like} />
          </button>
        </div>
      </form>
      <Books />
    </>
  );
}

export default AddBook;
