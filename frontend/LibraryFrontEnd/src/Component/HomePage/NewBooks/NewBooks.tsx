import { BookCard } from "../../BookCard/BookCard";
import { BookType, PaginatedBookType, PaginationType } from "../../../constants/types";
import { BOOK_URL } from "../../../constants/api";
import { getPaginatedItemsUrl } from "../../../constants/commonFunctions";
import "./NewBooks.css";
import { useContext, useEffect, useState } from "react";
import { ThemeContext, paginatedBooksCacheContext } from "../../../App/App";


export const NewBooks = ()  => {
    const theme = useContext(ThemeContext);
    const paginatedBooksCache = useContext(paginatedBooksCacheContext);
    const [pagination, setPagination] = useState<PaginationType>({ page: "1", pageSize: "6" });
    const [paginatedBooks, setPaginatedBooks] = useState<PaginatedBookType | undefined | null>(paginatedBooksCache?.paginatedBooks);
    const [initialBooks, setInitialBooks] = useState<BookType[] | undefined | null>(paginatedBooksCache?.paginatedBooks?.paginatedItems);

    const fetchNewBooks = async (page: string, pageSize: string) => {
        try {
            const newBooksResponse: Response = await fetch(
                getPaginatedItemsUrl(`${BOOK_URL}?`, page, pageSize));
            if (newBooksResponse.status === 200) {
                const newBooksResponseData: PaginatedBookType = await newBooksResponse.json();
                const concatenedItems = initialBooks ?
                    initialBooks.concat(newBooksResponseData.paginatedItems)
                    :
                    newBooksResponseData.paginatedItems;
                saveBooks({...newBooksResponseData,paginatedItems: concatenedItems});
            } else if (newBooksResponse.status === 404) {
                console.log(newBooksResponse);
            }
        } catch (error) {
            console.error("Error fetching books:", error);
        }
    };

    const saveBooks = (updatedBooks: PaginatedBookType) => {
        setPaginatedBooks(updatedBooks);
        setInitialBooks(updatedBooks.paginatedItems);
        paginatedBooksCache?.setPaginatedBooks(updatedBooks);
    }

    const goToNextPage = () => {
        const nextPageNumber = (paginatedBooks ? paginatedBooks?.page + 1 : 1);
        if (paginatedBooks && nextPageNumber <= paginatedBooks?.totalPages) {
            setPagination((prev) => ({ ...prev, page: nextPageNumber.toString() }))
            fetchNewBooks(nextPageNumber.toString(), pagination.pageSize);
        }
    }
    
    useEffect(() => {
        if (!initialBooks || initialBooks.length === 0) {
            fetchNewBooks(pagination.page, pagination.pageSize)
        }
    }, []);

    if (!initialBooks) {
        return <h1 className={"Books__Loading--" + theme}></h1>;
    }

    return (
        <>
            <h1 className="BookListTitle">Recent</h1>
                <div className="bookListContainer--flex">
                    {initialBooks &&
                        Array.isArray(initialBooks) &&
                        initialBooks
                            .sort((previousNewBook, lastNewBook) => lastNewBook.id - previousNewBook.id)
                            .map((newBook) => (
                            <BookCard key={newBook.id} book={newBook} />
                            ))}
                    <button onClick={goToNextPage}
                    >next Page</button>
                </div>
        </>
    )
};