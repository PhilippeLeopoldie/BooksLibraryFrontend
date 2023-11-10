import "./App.css";
import { BookCreate } from "../BookCreate/BookCreate";
import { BookList } from "../BookList/BookList";
import { Routes, BrowserRouter, Route, Link } from "react-router-dom";
import { BookSearch } from "../BookSearch/BookSearch";
import addIcone from "../../media/add20px.svg";
import bookIcone from "../../media/book48px.svg";
import homeIcone from "../../media/home_48px.svg";
import searchIcone from "../../media/search48px.svg";

export const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <div className="navbar--grid">
          <Link className="nav-link nav__home__Link--flex" to="/">
            <img
              className="nav-link icone nav__HomeIcone"
              src={homeIcone}
              alt="Home"
            ></img>
            <figcaption className="iconeTitle nav__Home__title">
              Home
            </figcaption>
          </Link>
          <Link className="nav-link nav__search__link--flex" to="/Search">
            <img
              className="nav-link icone nav__search__image"
              src={searchIcone}
              alt="Search"
            />
            <figcaption className="iconeTitle nav__search__title">
              Search
            </figcaption>
          </Link>
          <Link className="nav-link nav__addBook--flex" to="/addBook">
            <img
              className="nav-link icone nav__addBook"
              src={bookIcone}
              alt="book"
            />
            <img className="nav-link addIcone" src={addIcone} alt="add" />
            <figcaption className="iconeTitle nav__AddBook__Title">
              Add a book
            </figcaption>
          </Link>
        </div>
        <Routes>
          <Route path="/" element={<BookList />} />
          <Route path="/addBook" element={<BookCreate />} />
          <Route path="/Search" element={<BookSearch />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};
