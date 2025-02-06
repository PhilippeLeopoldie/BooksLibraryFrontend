import { BookCard } from "../../BookCard/BookCard";
import { BookType, PaginatedBookType, PaginationType } from "../../../constants/types";
import { BOOK_URL } from "../../../constants/api";
import { getPaginatedItemsUrl } from "../../../constants/commonFunctions";
import { useContext, useEffect, useState } from "react";
import { ThemeContext, newBooksCacheContext } from "../../../App/App";


export const NewBooks = ()  => {
    const theme = useContext(ThemeContext);
    const [pagination, setPagination] = useState<PaginationType>({ page: "1", pageSize: "6" })
    const [booksResponse, setBooksResponse] = useState<PaginatedBookType>();
    const newBooksCache = useContext(newBooksCacheContext);
    const [initialBooks, setInitialBooks] = useState<BookType[] | undefined | null>(newBooksCache?.newBooksCache);

    const fetchNewBooks = async (page: string, pageSize: string) => {
        try {
            const newBooksResponse: Response = await fetch(
                getPaginatedItemsUrl(`${BOOK_URL}?`, page, pageSize));
            if (newBooksResponse.status === 200) {
                const newBooksResponseData: PaginatedBookType = await newBooksResponse.json();
                saveBooks({ ...newBooksResponseData, paginatedItems: addBooks(initialBooks, newBooksResponseData.paginatedItems) });

            } else if (newBooksResponse.status === 404) {
                console.log(newBooksResponse);
            }
        } catch (error) {
            console.error("Error fetching books:", error);
        }
    };

    const addBooks = (initialBooks: BookType[] | undefined | null, newBooks: BookType[]) => {
        if (initialBooks) {
            return initialBooks.concat(newBooks);
        }
        return newBooks;
    }

    const saveBooks = (booksResponseData: PaginatedBookType) => {
        console.log(`saveBooks is called!`)
        setBooksResponse(booksResponseData);
        setInitialBooks(booksResponseData.paginatedItems);
        newBooksCache?.setNewBooksCache(booksResponseData.paginatedItems);
    }

    const nextPage = () => {
        const newPage = (Number(pagination.page) + 1);
        if (booksResponse && newPage <= booksResponse?.totalPages) {
            setPagination({ ...pagination, page: newPage.toString() })
            fetchNewBooks(newPage.toString(), pagination.pageSize);
        } else {
            console.log("Nextpage condition not fullfilled!")
            console.log(`booksResponse : ${booksResponse}`)
        }
    }

    useEffect(() => {
        if (!initialBooks || initialBooks.length === 0) fetchNewBooks(pagination.page, pagination.pageSize)
    }, []);

    if (!initialBooks) {
        return <h1 className={"Books__Loading--" + theme}></h1>;
    }

    return (
        <>
            <h1 className="BookListTitle">Recent</h1>
            <div className="bookListContainer">
                {initialBooks &&
                    Array.isArray(initialBooks) &&
                    initialBooks
                        .sort((previousNewBook, lastNewBook) => lastNewBook.id - previousNewBook.id)
                        .map((newBook) => (
                            <BookCard key={newBook.id} book={newBook} />
                        ))}
                <button onClick={nextPage}
                >next Page</button>
            </div>
        </>
    )
};