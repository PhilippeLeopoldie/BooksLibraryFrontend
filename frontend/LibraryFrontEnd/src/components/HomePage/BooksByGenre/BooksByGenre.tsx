import { BookCard } from "../../BookCard/BookCard";
import { BOOKS_BY_GENRESId_URL } from "../../../constants/api"
import "./BookByGenre.css";
import { useContext ,useEffect, useState } from "react";
import { PaginatedBookType ,PaginationType } from "../../../constants/types";
import { getPaginatedItemsUrl } from "../../../constants/commonFunctions";
import { genresCacheContext, ThemeContext } from "../../../App/App";


export const BooksByGenre = ({ sessionStorageName }: { sessionStorageName: string }) => {
    const theme = useContext(ThemeContext);
    const genreCache = useContext(genresCacheContext);
    const selectedGenre = sessionStorage.getItem(sessionStorageName);
    const [pagination, setPagination] = useState<PaginationType>({ page: "1", pageSize: "6" })
    const [displayedContent, setDisplayedContent] = useState<JSX.Element>(<></>);
    const fetchBooksByGenreId = async () => {
        try {
            const selectedGenreName = genreCache?.genresCache?.genres
                .find((genre) => genre.id.toString() === selectedGenre)?.name;
            if (selectedGenreName) {
                const booksByIdResponse: Response =
                    await fetch(getPaginatedItemsUrl(`${BOOKS_BY_GENRESId_URL}${selectedGenre}&`, `${pagination.page}`, `${pagination.pageSize}`));
                if (booksByIdResponse.status === 200) {
                    const booksData: PaginatedBookType = await booksByIdResponse.json();
                    if (booksData.paginatedItems &&
                        Array.isArray(booksData.paginatedItems)) {
                        setDisplayedContent(
                            <>
                                <h3 className={`genreTitle genreTitle--${theme}`}>{`${selectedGenreName} (${booksData.totalItems})`}</h3>
                                <div className="bookListContainer--flex" >
                                    {booksData.paginatedItems.map((book) => (
                                        <BookCard key={book.id} book={book} />
                                    ))}
                                </div>
                            </>
                        )
                    };
                } else if (booksByIdResponse.status === 400) {
                    console.log(booksByIdResponse);
                    setDisplayedContent(<h3 className={`notFound_message notFound_message--${theme}`}> {
                        `No books found for '${selectedGenreName}' !`}</h3>);
                }
            }
        } catch (error) {
            console.error("Error fetching books", error);
        }
    }

    useEffect(() => {
        if (selectedGenre)
            fetchBooksByGenreId();
    }, [selectedGenre, theme, genreCache])

    return (
        <>
            {displayedContent}
        </>
    )
};