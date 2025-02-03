import { BookCard } from "../../BookCard/BookCard";
import { BookType, PaginatedBookType, PaginationType } from "../../../constants/types";
import { BOOK_URL } from "../../../constants/api";
import { getPaginatedItemsUrl } from "../../../constants/commonFunctions";
import { useContext, useEffect, useState } from "react";
import { ThemeContext, newBooksCacheContext } from "../../../App/App";


export const NewBooks = ()  => {
    const theme = useContext(ThemeContext);
    const [pagination, setPagination] = useState<PaginationType>({ page: "1", pageSize: "6" })
    const newBooksCache = useContext(newBooksCacheContext);
    const [newBooks, setNewBooks] = useState<BookType[] | undefined | null>(newBooksCache?.newBooksCache);

    const fetchNewBooks = async () => {
        try {
            const newBooksResponse: Response = await fetch(
                getPaginatedItemsUrl(`${BOOK_URL}?`, pagination.page, pagination.pageSize));
            if (newBooksResponse.status === 200) {
                const newBooksResponseData: PaginatedBookType = await newBooksResponse.json();
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
        if (!newBooks || newBooks.length === 0) fetchNewBooks()
    }, []);

    if (!newBooks) {
        return <h1 className={"Books__Loading--" + theme}>Loading...</h1>;
    }

    return (
        <>
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
        </>
    )
};