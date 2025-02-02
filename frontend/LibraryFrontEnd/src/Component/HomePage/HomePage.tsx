import { BookCard } from "../BookCard/BookCard";
import "./HomePage.css";
import { BOOK_URL } from "../../constants/api";
import { BookType, PaginatedBookType, PaginationType } from "../../constants/types";
import { getPaginatedItemsUrl } from "../../constants/commonFunctions";
import { TopBook } from "./TopBooks/TopBook";
import { useContext, useEffect, useState } from "react";
import { newBooksCacheContext, ThemeContext } from "../../App/App";

export const HomePage = () => {
    const theme = useContext(ThemeContext);
    const [pagination, setPagination] = useState<PaginationType>({ page:"1", pageSize:"6" })
    const newBooksCache = useContext(newBooksCacheContext);
    const [newBooks, setNewBooks] = useState<BookType[] | undefined | null>(newBooksCache?.newBooksCache);
    const [numberOfBooks, setNumberOfBooks] = useState<number>(3);
    
    const fetchNewBooks = async () => {
        try {
            const newBooksResponse: Response = await fetch(getPaginatedItemsUrl(BOOK_URL, pagination.page, pagination.pageSize));
            if (newBooksResponse.status === 200) {
                const newBooksResponseData : PaginatedBookType = await newBooksResponse.json();
                setNewBooks(newBooksResponseData.paginatedItems);
                newBooksCache?.setNewBooksCache(newBooksResponseData.paginatedItems);
                
            } else if (newBooksResponse.status === 404) {
                console.log(newBooksResponse);
            }
        } catch (error) {
            console.error("Error fetching books:", error);
        }
    };

    useEffect(() => {
        if (!newBooks || newBooks.length === 0) fetchNewBooks();
        
    }, []);

    if (!newBooks || newBooks.length === 0 ) {
        return <h1 className={"Books__Loading--" + theme}>Loading...</h1>;
    }

    return (
        <>
            <div className={`BookList--${theme}--flex`}>
                <TopBook maxNumBooks={`${numberOfBooks}`} />
                <h1 className="BookListTitle">Recent</h1>
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
