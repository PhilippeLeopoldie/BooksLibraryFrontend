import { BookCard } from "../../BookCard/BookCard";
import { BOOKS_BY_GENRESId_URL } from "../../../constants/api"
import { useEffect, useState } from "react";
import { BookType, PaginatedBookType ,PaginationType } from "../../../constants/types";
import { getPaginatedItemsUrl } from "../../../constants/commonFunctions";


export const BooksByGenre = ({ sessionStorageName }: { sessionStorageName: string }) => {
    const selectedGenre = sessionStorage.getItem(sessionStorageName);
    const [pagination, setPagination] = useState<PaginationType>({ page: "1", pageSize: "6" })
    const [booksByGenre, setBooksByGenre] = useState<BookType[] | undefined >();

    const fetchBooksByGenreId = async () => {
        try {
            const booksByIdResponse: Response =
                await fetch(getPaginatedItemsUrl(`${BOOKS_BY_GENRESId_URL}${selectedGenre}&`, `${pagination.page}`, `${pagination.pageSize}`));
            if (booksByIdResponse.status === 200) {
                const booksData: PaginatedBookType = await booksByIdResponse.json();
                setBooksByGenre(booksData.paginatedItems);
            } else if (booksByIdResponse.status === 400) {
                console.log(booksByIdResponse);
            }
            
        } catch (error) {
            console.error("Error fetching books", error);
        }
    }

    useEffect(() => {
        fetchBooksByGenreId();
    }, [selectedGenre])


    return (
        <>
            {
                booksByGenre &&
                Array.isArray(booksByGenre) &&
                booksByGenre.map((book) => (
                    <BookCard key={book.id} book={book} />
                ))
            }
        </>
    )
}