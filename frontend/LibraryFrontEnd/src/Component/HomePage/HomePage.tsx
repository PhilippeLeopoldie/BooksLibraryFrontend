import { BookCard } from "../BookCard/BookCard";
import "./HomePage.css";
import { BOOK_LIST_URL } from "../../constants/api";
import { BOOK_TOP_BOOK_URL } from "../../constants/api";
import { useContext, useEffect, useState } from "react";
import { newBooksCacheContext, ThemeContext, topBooksCacheContext } from "../../App/App";


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

export const HomePage = () => {
    const theme = useContext(ThemeContext);
    const newBooksCache = useContext(newBooksCacheContext);
    const topBooksCache = useContext(topBooksCacheContext);
    const [newBooks, setNewBooks] = useState<BookType[] | undefined | null>(newBooksCache?.newBooksCache);
    const [topBooks, setTopBooks] = useState<BookType[] | undefined | null>(topBooksCache?.topBooksCache);
    const [numberOfBooks, setNumberOfBooks] = useState<number>(3);
    
    const fetchNewBooks = async () => {
        try {
            const newBooksResponse: Response = await fetch(BOOK_LIST_URL);
            if (newBooksResponse.status === 200) {
                const newBooksResponseData = await newBooksResponse.json();
                setNewBooks(newBooksResponseData.books);
                newBooksCache?.setNewBooksCache(newBooksResponseData.books);
                
            } else if (newBooksResponse.status === 404) {
                console.log(newBooksResponse);
            }
        } catch (error) {
            console.error("Error fetching books:", error);
        }
    };

    const fetchTopBook = async () => {
        try {
            const topBookResponse: Response = await fetch(`${BOOK_TOP_BOOK_URL}${numberOfBooks}`);
            if (topBookResponse.status === 200) {
                const topBookResponseData = await topBookResponse.json();
                setTopBooks(topBookResponseData);
                topBooksCache?.setTopBooksCache(topBookResponseData);
            } else if (topBookResponse.status === 404) {
                console.log(topBookResponse);
            }
        } catch (error) {
            console.error("Error fetching TopBook:", error);
        }
    };

    useEffect(() => {
        if (!newBooks) fetchNewBooks();
        if (!topBooks) fetchTopBook();
    }, []);

    if (!newBooks || !topBooks) {
        return <h1 className={"Books__Loading--" + theme}>Loading...</h1>;
    }

    return (
        <>
            <div className={`BookList--${theme}--flex`}>
                <h1 className="BookList_Top">{`Top ${numberOfBooks} Most popular`}</h1>
                <div className="bookListContainer">
                    {topBooks?.map((topBook) => (
                        <BookCard key={topBook.id} book={topBook} />
                    ))}
                </div>
                <h1 className="BookList">New books</h1>
                <div className="bookListContainer">
                    {newBooks &&
                        Array.isArray(newBooks) &&
                        newBooks
                            .sort((previousNewBook, lastNewBook) => lastNewBook.id - previousNewBook.id)
                            .map((newBook) => (
                                <BookCard key={newBook.id} book={newBook} />
                            ))}
                </div>
            </div>
        </>
    );
};
