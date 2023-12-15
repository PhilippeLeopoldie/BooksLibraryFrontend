import "./App.css";
import { BookCreate } from "../Books/BookCreate/BookCreate";
import { BookList } from "../Books/BookList/BookList";
import { Routes, BrowserRouter, Route, Link } from "react-router-dom";
import { BookSearch } from "../Books/BookSearch/BookSearch";
import { createContext, useContext, useState } from "react";
import addIcone from "../../media/add20px.svg";
import addBlueIcone from "../../media/add_blue_20px.svg";
import bookIcone from "../../media/book48px.svg";
import bookBlueIcone from "../../media/book_blue_48px.svg";
import homeIcone from "../../media/home_48px.svg";
import homeBlueIcone from "../../media/home_blue_48px.svg";
import searchIcone from "../../media/search48px.svg";
import searchBlueIcone from "../../media/search_blue_48px.svg";
import settingsIcone from "../../media/settings48px.svg";
import settingsBlueIcone from "../../media/settings_blue_48px.svg";

export const ThemeContext = createContext<string>("natural");

export const App = () => {
  const [theme, setTheme] = useState<string>("natural");
  const [activeNavItem , setActiveNavItem ] = useState<string>("home");
  return (
    <div className={`App App--${theme}`}>
      <ThemeContext.Provider value={theme}>
        <BrowserRouter>
          <nav className={"navbar--grid navbar--" + theme}>
            <Link className="nav-link nav__home__Link--flex" to="/" onClick={()=> {setActiveNavItem("home")}}>
              <img
                className="nav-link icone nav__HomeIcone"
                src={activeNavItem==="home"? homeBlueIcone : homeIcone}
                alt="Home"
              ></img>
              <figcaption className={activeNavItem==="home"? "iconeTitle--blue nav__Home__title":"iconeTitle nav__Home__title"}>
                Home
              </figcaption>
            </Link>
            <Link className="nav-link nav__search__link--flex" to="/Search" onClick={()=> {setActiveNavItem("search")}}>
              <img
                className="nav-link icone nav__search__image"
                src={activeNavItem==="search"? searchBlueIcone :searchIcone}
                alt="Search"
              />
              <figcaption className={activeNavItem==="search"?"iconeTitle--blue nav__search__title":"iconeTitle nav__search__title"}>
                Search
              </figcaption>
            </Link>
            <Link className="nav-link nav__addBook--flex" to="/addBook" onClick={()=> {setActiveNavItem("addBook")}}>
              <img
                className="nav-link icone nav__addBook"
                src={activeNavItem==="addBook"? bookBlueIcone :bookIcone}
                alt="book"
              />
              <img className="nav-link addIcone" src={activeNavItem==="addBook"? addBlueIcone :addIcone} alt="add" />
              <figcaption className={activeNavItem==="addBook"?"iconeTitle--blue nav__AddBook__Title":"iconeTitle nav__AddBook__Title"}>
                Add book
              </figcaption>
            </Link>
            <div className="nav-link icone settingsIcone">
              <img
                className="nav-link"
                src={activeNavItem==="settings"? settingsBlueIcone :settingsIcone}
                onClick={() => {
                  setTheme(theme === "natural" ? "black" : "natural");
                  setActiveNavItem("settings");
                }}
                alt="Themes"
              />
              <figcaption className={activeNavItem==="settings"?"iconeTitle--blue nav__Settings__Title":"iconeTitle nav__Settings__Title"}>Themes</figcaption>
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
