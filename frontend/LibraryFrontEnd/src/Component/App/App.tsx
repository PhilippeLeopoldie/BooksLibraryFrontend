import "./App.css";
import { AddBook } from "../BookCreate/BookCreate";
import { BookList } from "../BookList/BookList";
import { Routes, BrowserRouter, Route, Link } from "react-router-dom";
import { BookSearch } from "../BookSearch/BookSearch";
import addIcone from "../../media/add64px.svg";
import bookIcone from "../../media/book64px.svg";
import homeIcone from "../../media/home_42px.svg";
import searchIcone from "../../media/search64px.svg";

export const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <div className="navbar">
          <dl className="navElement navbar__home">
            <Link className="nav-link homeLink" to="/">
              <img className="nav__HomeIcone" src={homeIcone} alt="Home"></img>
              <figcaption className="iconeTitle nav__Home__title">
                Home
              </figcaption>
            </Link>
          </dl>
          <dl className="navElement navbar__search">
            <Link className="nav-link" to="/Search">
              <img
                className="nav-link nav__search"
                width="48"
                height="48"
                src={searchIcone}
                alt="Search"
              />
              <figcaption className="iconeTitle nav__search__title">
                Search
              </figcaption>
            </Link>
          </dl>
          <dl className="navElement navbar__addBook">
            <Link className="nav-link addBook" to="/addBook">
              <img
                className="nav-link nav__addBook"
                width="48"
                height="48"
                src={bookIcone}
                alt="book"
              />
              
              <img
                className="nav-link addIcone"
                width="20"
                height="20"
                src={addIcone}
                alt="add"
              />
              <figcaption className="iconeTitle nav__AddBook__Title">
                Add a book
              </figcaption>
            </Link>
          </dl>
        </div>
        <Routes>
          <Route path="/" element={<BookList />}/>
          <Route path="/addBook" element={<AddBook />}/>
          <Route path="/Search" element={<BookSearch/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
};
