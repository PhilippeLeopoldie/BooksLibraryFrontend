import { BookCard } from "../../BookCard/BookCard";
import { BookType, PaginatedBookType, PaginationType } from "../../../constants/types";
import { BOOK_URL } from "../../../constants/api";
import { getPaginatedItemsUrl } from "../../../constants/commonFunctions";
import "./NewBooks.css";
import { useContext, useEffect, useState, useRef, useCallback } from "react";
import { ThemeContext, paginatedBooksCacheContext } from "../../../App/App";


export const NewBooks = ()  => {
    const theme = useContext(ThemeContext);
    const paginatedBooksContext = useContext(paginatedBooksCacheContext);
    const [pagination, setPagination] = useState<PaginationType>({ page: "1", pageSize: "6" });
    const [paginatedBooks, setPaginatedBooks] = useState<PaginatedBookType | undefined | null>(paginatedBooksContext?.paginatedBooks);
    const observer = useRef<IntersectionObserver | null>(null);

    const fetchNewBooks = async (page: string, pageSize: string) => {
        try {
            const newBooksResponse: Response = await fetch(getPaginatedItemsUrl(`${BOOK_URL}?`, page, pageSize));

            if (newBooksResponse.status === 200) {
                const newBooksResponseData: PaginatedBookType = await newBooksResponse.json();
                const concatenedItems = paginatedBooks?.paginatedItems
                        ? paginatedBooks.paginatedItems.concat(newBooksResponseData.paginatedItems)
                        : newBooksResponseData.paginatedItems;
                saveBooks({...newBooksResponseData,paginatedItems: concatenedItems});
            } else if (newBooksResponse.status === 404) {
                console.log(newBooksResponse);
            }
        } catch (error) {
            console.error("Error fetching books:", error);
        }
    };

    const saveBooks = (updatedPaginatedBooks: PaginatedBookType) => {
        setPaginatedBooks(updatedPaginatedBooks);
        paginatedBooksContext?.setPaginatedBooks(updatedPaginatedBooks);
    }

    const goToNextPage = () => {
        if (!paginatedBooks) return;
        const nextPageNumber = paginatedBooks.page + 1 ;
        if (nextPageNumber <= paginatedBooks.totalPages) {
            setPagination((prev) => ({ ...prev, page: nextPageNumber.toString() }))
            fetchNewBooks(nextPageNumber.toString(), pagination.pageSize);
        }
    }

    const lastBookCardRef = useCallback((node: HTMLDivElement | null) => {
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                goToNextPage();
            }
        });
        if (node) observer.current.observe(node);
    }, [paginatedBooks]);
    
    useEffect(() => {
        if (!paginatedBooks || paginatedBooks?.paginatedItems.length === 0) {
            fetchNewBooks(pagination.page, pagination.pageSize)
        }
    }, []);

    return (
        <>
            <h1 className="BookListTitle">Recent</h1>
            <div className="bookListContainer--flex">
                {paginatedBooks?.paginatedItems &&
                    paginatedBooks.paginatedItems
                        .sort((previousNewBook, lastNewBook) => lastNewBook.id - previousNewBook.id)
                        .map((newBook, index) =>
                            <div className="bookRefContainer"
                                key={newBook.id}
                                ref={index === paginatedBooks.paginatedItems.length - 1 ?
                                    lastBookCardRef
                                    : null}>
                                <BookCard book={newBook} />
                            </div>
                        )}
            </div>
        </>
    )
};