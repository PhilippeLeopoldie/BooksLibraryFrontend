import "./App.css";
import { BookCreate } from "../BookCreate/BookCreate";
import { HomePage } from "../HomePage/HomePage";
import { Routes, BrowserRouter, Route} from "react-router-dom";
import { BookSearch } from "../BookSearch/BookSearch";
import { createContext, useContext, useState } from "react";
import { NavBar } from "../NavBar/NavBar";
import { Settings } from "../Settings/Settings";
import { Preferences } from "../Preferences/Preferences";

export const ThemeContext = createContext<string>("black");

export const App = () => {
  const rootElement = document.documentElement;
  const [theme, setTheme] = useState<string>("black");
  const handleTheme = () => {
    setTheme(theme === "natural" ? "black" : "natural");
  }
  
  return (
      <div className={`App App--${theme}`}>
          <script>
              {theme === "black"
                  ? (rootElement.style.backgroundColor = "#000000")
                  : (rootElement.style.backgroundColor = "#f3f3f4")}
          </script>
      <ThemeContext.Provider value={theme}>
              <BrowserRouter>
                  <div className={`App App--${theme}` }>
                      <NavBar theme={theme}/>
                      <div className="Contents">
                          <Routes>
                              <Route path="/" element={<HomePage />} />
                              <Route path="/addBook" element={<BookCreate />} />
                              <Route path="/Search" element={<BookSearch />} />
                              <Route path="/Settings" element={<Settings theme={theme} handleTheme={handleTheme} />} />
                          </Routes>
                      </div>
                      
                  </div>
                  
        </BrowserRouter>
      </ThemeContext.Provider>
    </div>
  );
};
