import "./App.css";
import { BookCreate } from "../Component/BookCreate/BookCreate";
import { HomePage } from "../Component/HomePage/HomePage";
import { Routes, BrowserRouter, Route } from "react-router-dom";
import { BookSearch } from "../Component/BookSearch/BookSearch";
import { createContext, useContext, useState } from "react";
import { NavBar } from "../Component/NavBar/NavBar";
import { SideBar } from "../Component/SideBar/SideBar"
import { StoryCard } from "../Component/Story/StoryCard";


type ButtonContextType = {
    buttonStatus: string,
    setButtonStatus: (newStatus: string) => void;
}

type BookType = {
    id: number;
    title: string;
    author: string;
    imageUrl?: string;
    averageRate: number;
    opinions?: OpinionType | null;
};

type OpinionType = {
    rate: number;
    view: string;
    userName: string;
};

type NewBooksFetchingContextType = {
    newFetchedBooks: BookType[] | null,
    setNewFetchedBooks: (newStatus: BookType[]) => void
}

type TopBooksFetchingContextType = {
    topFetchedBooks: BookType[] | null,
    setTopFetchedBooks: (newStatus: BookType[]) => void
}

export const ThemeContext = createContext<string>("black");
export const ButtonContext = createContext<ButtonContextType | undefined>(undefined);
export const newBooksFetchingContext = createContext<NewBooksFetchingContextType | null>(null);
export const topBooksFetchingContext = createContext<TopBooksFetchingContextType | null>(null);

export const App = () => {
    const rootElement = document.documentElement;
    const [theme, setTheme] = useState<string>("black");
    const [buttonStatus, setButtonStatus] = useState<string>("inactivated");
    const [newFetchedBooks, setNewFetchedBooks] = useState<BookType[] | null>(null);
    const [topFetchedBooks, setTopFetchedBooks] = useState<BookType[] | null>(null);
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
                <ButtonContext.Provider value={{ buttonStatus, setButtonStatus }}>
                    <newBooksFetchingContext.Provider value={{ newFetchedBooks, setNewFetchedBooks }}>
                        <topBooksFetchingContext.Provider value={{ topFetchedBooks, setTopFetchedBooks }}>
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
                                            <Route path="/createStory" element={<StoryCard />} />
                                        </Routes>
                                    </section>
                                </div>
                            </BrowserRouter>
                        </topBooksFetchingContext.Provider>
                    </newBooksFetchingContext.Provider>
                </ButtonContext.Provider>
            </ThemeContext.Provider>
        </div>
    );
};
