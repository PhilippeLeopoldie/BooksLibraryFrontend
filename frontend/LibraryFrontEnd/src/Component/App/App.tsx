import "./App.css";
import { BookCreate } from "../BookCreate/BookCreate";
import { HomePage } from "../HomePage/HomePage";
import { Routes, BrowserRouter, Route } from "react-router-dom";
import { BookSearch } from "../BookSearch/BookSearch";
import { createContext, useContext, useState } from "react";
import { NavBar } from "../NavBar/NavBar";
import { Settings } from "../Settings/Settings";
import { SideBar } from "../SideBar/SideBar"

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
                    <div className={`App App--${theme}`}>
                        <section className={`App--${theme} App_navBar--container`}>
                            <NavBar theme={theme} handleTheme={handleTheme} />
                            <SideBar theme={theme} handleTheme={handleTheme} />
                        </section>
                        <section className="Contents">
                            <Routes>
                                <Route path="/" element={<HomePage />} />
                                <Route path="/addBook" element={<BookCreate />} />
                                <Route path="/Search" element={<BookSearch />} />
                                <Route path="/Settings" element={<Settings theme={theme} handleTheme={handleTheme} />} />
                            </Routes>
                        </section>
                    </div>
                </BrowserRouter>
            </ThemeContext.Provider>
        </div>
    );
};
