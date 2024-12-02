import { BookCard } from "../BookCard/BookCard";
import "./HomePage.css";
import { BOOK_LIST_URL } from "../../constants/api";
import { BOOK_TOP_BOOK_URL } from "../../constants/api";
import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../App/App";

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
    const [newBooks, setBooks] = useState<BookType[] | null>(null);
    const [topBook, setTopBook] = useState<BookType[] | null>(null);
    const [numberOfBooks, setNumberOfBook] = useState<number>(3);
    const [isFetched, setIsfetched] = useState<boolean>(false);
    const fetchBooks = async () => {
        try {
            const booksResponse: Response = await fetch(BOOK_LIST_URL);
            if (booksResponse.status === 200) {
                const booksResponseData = await booksResponse.json();
                setBooks(booksResponseData.books);
            } else if (booksResponse.status === 404) {
                console.log(booksResponse);
            }
        } catch (error) {
            console.error("Error fetching books:", error);
        }
    };

    const fetchTopBook = async () => {
        try {
            const topBookResponse: Response = await fetch(`${BOOK_TOP_BOOK_URL} ${numberOfBooks}`);
            if (topBookResponse.status === 200) {
                const topBookResponseData = await topBookResponse.json();
                setTopBook(topBookResponseData);
            } else if (topBookResponse.status === 404) {
                console.log(topBookResponse);
            }
        } catch (error) {
            console.error("Error fetching TopBook:", error);
        }
    };

    useEffect(() => {
        if (newBooks === null) {
            fetchTopBook();
            fetchBooks();
        }
    }, []);

    if (!newBooks) {
        return <h1 className={"Books__Loading--" + theme}>Loading...</h1>;
    }

    return (
        <>
            <div className={`BookList--${theme}--flex`}>
                <h1 className="BookList_Top">{`Top ${numberOfBooks} Most popular`}</h1>
                <div className="bookListContainer">
                    {topBook?.map((topBook) => (
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
