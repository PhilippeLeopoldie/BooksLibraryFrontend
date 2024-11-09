import "./App.css";
import { BookCreate } from "../BookCreate/BookCreate";
import { HomePage } from "../HomePage/HomePage";
import { Routes, BrowserRouter, Route} from "react-router-dom";
import { BookSearch } from "../BookSearch/BookSearch";
import { createContext, useContext, useState } from "react";
import { NavBar } from "../NavBar/NavBar";
import { Settings } from "../Settings/Settings";

export const ThemeContext = createContext<string>("black");

export const App = () => {
  const rootElement = document.documentElement;
  const [theme, setTheme] = useState<string>("black");
  const handleTheme = () => {
    setTheme(theme === "natural" ? "black" : "natural");
    }
    const [sideBarActivated, setSideBarActivated] = useState<boolean>(false);

    const handleSideBar = () => {
        setSideBarActivated(!sideBarActivated);
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
                    <div className={`App App--${theme}`}>
                        <div className={`App--${theme} App_navBar--container`}>
                            <NavBar theme={theme} handleTheme={handleTheme} />
                            <aside className={`SideBar_container ${sideBarActivated ? "SideBar_container--activated" : "SideBar_container--inactivated"}`}>
                                <div
                                    onClick={handleSideBar}
                                    className={`SideBar ${sideBarActivated ? "SideBar_activated" : "SideBar_inactivated"}--${theme}`}>
                                    <hr className={`line--${theme} ${sideBarActivated ? "line1-cross" : "line1-straight"}--${theme}`}></hr>
                                    <hr className={`line--${theme} ${sideBarActivated ? "line2-disappear" : "line2-straight"}--${theme}`}></hr>
                                    <hr className={`line--${theme} ${sideBarActivated ? "line3-cross" : "line3-straight"}--${theme}`}></hr>
                                </div>
                                <div className={`SideBar_settings--${theme}`}>{sideBarActivated && <Settings theme={theme} handleTheme={handleTheme} />}</div>
                          </aside>  
                       </div>
                      
                      
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
