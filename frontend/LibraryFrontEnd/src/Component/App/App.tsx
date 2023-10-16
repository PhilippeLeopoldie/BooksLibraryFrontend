import "./App.css";
import { AddBook } from "../BookCreate/BookCreate";
import { BookList } from "../BookList/BookList";
import { Routes, BrowserRouter, Route, Link } from "react-router-dom";

export const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <div className="nav">
          <ul className="liste">
            <dl className="nav-data">
              <Link className="nav-link home" to="/">
                Home
              </Link>
            </dl>
            <dl className="nav-data">
              <Link className="nav-link" to="/addBook">
                Add a Book
              </Link>
            </dl>
          </ul>
        </div>
        <Routes>
          <Route path="/" element={<BookList />}></Route>
          <Route path="/addBook" element={<AddBook />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};
