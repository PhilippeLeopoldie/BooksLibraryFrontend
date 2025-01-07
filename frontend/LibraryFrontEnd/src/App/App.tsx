import "./App.css";
import { About } from "../Component/About/About";
import { BookCreate } from "../Component/BookCreate/BookCreate";
import { GENRES_LIST_URL } from "../constants/api";
import { HomePage } from "../Component/HomePage/HomePage";
import { Routes, BrowserRouter, Route } from "react-router-dom";
import { BookSearch } from "../Component/BookSearch/BookSearch";
import { createContext, useContext, useEffect, useState } from "react";
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

type GenreResponseType = {
    genres: GenreType[],
    totalGenreCount: number,
}

type GenreType = {
    id: number,
    name: string,
    books: BookType[]
}

type genresCacheContextType = {
    genresCache: GenreResponseType | null,
    setGenresCache: (newStatus: GenreResponseType) => void
}

type NewBooksCacheContextType = {
    newBooksCache: BookType[] | null,
    setNewBooksCache: (newStatus: BookType[]) => void
}

type TopBooksCacheContextType = {
    topBooksCache: BookType[] | null,
    setTopBooksCache: (newStatus: BookType[]) => void
}

export const ThemeContext = createContext<string>("black");
export const ButtonContext = createContext<ButtonContextType | undefined>(undefined);
export const newBooksCacheContext = createContext<NewBooksCacheContextType | null>(null);
export const topBooksCacheContext = createContext<TopBooksCacheContextType | null>(null);
export const genresCacheContext = createContext<genresCacheContextType | null>(null);

export const App = () => {
    const rootElement = document.documentElement;
    const [theme, setTheme] = useState<string>("black");
    const [buttonStatus, setButtonStatus] = useState<string>("inactivated");
    const [newBooksCache, setNewBooksCache] = useState<BookType[] | null>(null);
    const [topBooksCache, setTopBooksCache] = useState<BookType[] | null>(null);
    const [genresCache, setGenresCache] = useState<GenreResponseType | null>(null);

    const handleTheme = () => {
        setTheme(theme === "natural" ? "black" : "natural");
    }

    const fetchGenres = async () => {
        try {
            const genreResponse: Response = await fetch(GENRES_LIST_URL);
            if (genreResponse.status === 200) {
                const genreResponseData: GenreResponseType = await genreResponse.json();
                setGenresCache(genreResponseData);
                console.log(genreResponseData.genres);
            } else if (genreResponse.status === 404) {
                console.log(genreResponse);
            }
        } catch (error) {
            console.error("Error fetching genres", error);
        }
    }
    useEffect(() => {
        if (!genresCache) fetchGenres();
    }, []);
    
    return (
        <div className={`App App--${theme}`}>
            <script>
                {theme === "black"
                    ? (rootElement.style.backgroundColor = "#1e1e1e")
                    : (rootElement.style.backgroundColor = "#F5F5F5")}
            </script>
            <ThemeContext.Provider value={theme}>
                <ButtonContext.Provider value={{ buttonStatus, setButtonStatus }}>
                    <newBooksCacheContext.Provider value={{ newBooksCache, setNewBooksCache }}>
                        <topBooksCacheContext.Provider value={{ topBooksCache, setTopBooksCache }}>
                            <genresCacheContext.Provider value={{ genresCache, setGenresCache }}>
                            <BrowserRouter>
                                <div className={`App App--${theme}`}>
                                    <section className={`App--${theme} App_navBar--container`}>
                                        <NavBar theme={theme} handleTheme={handleTheme} />
                                        <SideBar theme={theme} handleTheme={handleTheme} />
                                    </section>
                                    <section className="Contents">
                                        <Routes>
                                            <Route path="/" element={<HomePage />} />
                                            <Route path="/about" element={<About/>} />
                                            <Route path="/addBook" element={<BookCreate />} />
                                            <Route path="/Search" element={<BookSearch />} />
                                            <Route path="/createStory" element={<StoryCard />} />
                                        </Routes>
                                    </section>
                                </div>
                                </BrowserRouter>
                            </genresCacheContext.Provider>
                        </topBooksCacheContext.Provider>
                    </newBooksCacheContext.Provider>
                </ButtonContext.Provider>
            </ThemeContext.Provider>
        </div>
    );
};
