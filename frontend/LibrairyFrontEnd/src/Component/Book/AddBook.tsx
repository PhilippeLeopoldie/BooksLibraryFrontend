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
    userName: ""
  })
  const [books, setBooks] = useState<BookType[]>([]);

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
    const response = await fetch(url+"api/Book",requestOptions);
    const body = await response.json();
    setBooks(books => [...books, body]);
    return body;
  };
  const fetchBooks = async () => {
    try {
      const booksData = await FetchApi(url+"api/Book");
      setBooks(booksData.$values);
    } catch (error) {
      console.error("error fetching books:", error);
    }
  };

  useEffect(() => { 
    fetchBooks();
  }, []);

  const PostOpinion = async (bookId: number, rate: number) => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        bookId,
        rate: rate,
        view: formData.view,
        userName: formData.userName,
      }),
    };
    const OpinionResponse = await fetch(url+"api/Opinion",requestOptions);
    const newOpinion = await OpinionResponse.json(); 
    
  };

  return (
    <>
      <form
        onSubmit={(e) => e.preventDefault()}
        action={url+"api/Book"}
        method="POST"
        className="bookform"
      >
        <div className="bookform__inputs">
          <input
            className="input"
            placeholder="Title"
            value={formData.title}
            onChange={(e) => 
              setFormData({...formData ,title: e.target.value})
            }
          />

          <input
            className="input"
            placeholder="Author"
            value={formData.author}
            onChange={(e) =>
              setFormData({...formData ,author: e.target.value})
            }
          />

          <textarea
            className="bookform__view input"
            placeholder="View"
            value={formData.view}
            onChange={(e) => 
              setFormData({...formData, view :e.target.value})
            }
          />

          <input
            className="input"
            placeholder="UserName"
            value={formData.userName}
            onChange={(e) => 
              setFormData({...formData, userName:e.target.value})
            }
          />
        </div>

        <div>
          <button
            className="button bookform__button"
            onClick={async () => {
              PostOpinion((await PostBook()).bookId, 0);
            }}
          >
            Add
            <img className="icone iconeRate" src={sad} />
          </button>

          <button
            className="button bookform__button"
            type="submit"
            onClick={async () => {
              PostOpinion((await PostBook()).bookId, 1);
            }}
          >
            Add
            <img className="icone iconeRate" src={love} />
          </button>
        </div>
      </form>
      {/* <Books /> */}
    </>
  );
}

export default AddBook;
