import { BookCard } from "../../BookCard/BookCard";
import { BOOKS_BY_GENRESId_URL } from "../../../constants/api"
import "./BookByGenre.css";
import { useContext ,useEffect, useState } from "react";
import { BookType, PaginatedBookType ,PaginationType } from "../../../constants/types";
import { getPaginatedItemsUrl } from "../../../constants/commonFunctions";
import { ThemeContext } from "../../../App/App";


export const BooksByGenre = ({ sessionStorageName }: { sessionStorageName: string }) => {
    const theme = useContext(ThemeContext);
    const selectedGenre = sessionStorage.getItem(sessionStorageName);
    const [pagination, setPagination] = useState<PaginationType>({ page: "1", pageSize: "6" })
    const [booksByGenre, setBooksByGenre] = useState<BookType[] | undefined >();
    const [displayedContent, setDisplayedContent] = useState<JSX.Element>(<></>);
    const fetchBooksByGenreId = async () => {
        try {
            const booksByIdResponse: Response =
                await fetch(getPaginatedItemsUrl(`${BOOKS_BY_GENRESId_URL}${selectedGenre}&`, `${pagination.page}`, `${pagination.pageSize}`));
            if (booksByIdResponse.status === 200) {
                const booksData: PaginatedBookType = await booksByIdResponse.json();
                setBooksByGenre(booksData.paginatedItems);
                if (booksData.paginatedItems &&
                    Array.isArray(booksData.paginatedItems)) {
                    setDisplayedContent(
                        <>
                            {booksData.paginatedItems.map((book) => (
                                <BookCard key={book.id} book={book} />
                            ))}
                        </>
                    )
                };
            } else if (booksByIdResponse.status === 400) {
                console.log(booksByIdResponse);
                setDisplayedContent(<h3 className={`notFound_message` }> No books found for this genre...</h3>);
            }

        } catch (error) {
            console.error("Error fetching books", error);
        }
    }

    useEffect(() => {
        if (selectedGenre)
        fetchBooksByGenreId();
    }, [selectedGenre])

    return (
        <div className={`bookListContainer` }>
            {displayedContent}
        </div>
    )
}