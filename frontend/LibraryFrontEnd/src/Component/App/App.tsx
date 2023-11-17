import "./App.css";
import { BookCreate } from "../BookCreate/BookCreate";
import { BookList } from "../BookList/BookList";
import { Routes, BrowserRouter, Route, Link } from "react-router-dom";
import { BookSearch } from "../BookSearch/BookSearch";
import { createContext, useContext, useState } from "react";
import addIcone from "../../media/add20px.svg";
import bookIcone from "../../media/book48px.svg";
import homeIcone from "../../media/home_48px.svg";
import searchIcone from "../../media/search48px.svg";
import settings from "../../media/settings48px.svg";

export const ThemeContext = createContext<string | null>(null);

export const App = () => {
  const [theme, setTheme] = useState<string>("natural");

  return (
    <div className="App">
      <ThemeContext.Provider value={theme}>
        <BrowserRouter>
          <nav className={"navbar--grid navbar--" + theme}>
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
            <div className="nav-link icone settingsIcone">
              <img
                className="nav-link"
                src={settings}
                onClick={() => {
                  setTheme(theme === "natural" ? "antique" : "natural");
                }}
                alt="Themes"
              />
              <figcaption className="iconeTitle nav__Settings__Title">Themes</figcaption>
            </div>
          </nav>
          <Routes>
            <Route path="/" element={<BookList />} />
            <Route path="/addBook" element={<BookCreate />} />
            <Route path="/Search" element={<BookSearch />} />
          </Routes>
        </BrowserRouter>
      </ThemeContext.Provider>
    </div>
  );
};
