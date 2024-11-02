import { BookCard } from "../../BookCard/BookCard";
import "../../BookSearch/BookSearchList/BookSearchList.css";
import { useContext, useEffect, useState } from "react";
import { BOOK_BY_TITLE_OR_AUTHOR_URL } from "../../../Url";
import { ThemeContext } from "../../App/App";

type BooksType = {
    book: {
        id: number;
        title: string;
        author: string;
        averageRate: number;
    };
};

type BooksSearchCriteria = {
    titleOrAuthor: string;
};

export const BookSearchList = ({ titleOrAuthor }: BooksSearchCriteria) => {

    const [books, setBooks] = useState<BooksType[] | null>([]);
    const searching = "Searching ...";
    const [waitingMessage, setWaitingMessage] = useState<string>(searching);
    const theme = useContext(ThemeContext);
    const fetchBooksByTitleOrAuthor = async () => {
        try {
            if (titleOrAuthor === "") {
                setBooks([]);
                setWaitingMessage(searching);
            }
            if (titleOrAuthor !== "") {
                const booksResponse: Response = await fetch(
                    BOOK_BY_TITLE_OR_AUTHOR_URL + titleOrAuthor
                );
                if (booksResponse.status === 200) {
                    const booksResponseData = await booksResponse.json();
                    setBooks(booksResponseData);
                    setWaitingMessage("");
                } else if (booksResponse.status === 404) {
                    setBooks([]);
                    setWaitingMessage("");
                    console.log(booksResponse);
                }
            }
        } catch (error) {
            console.error("Error fetching books:", error);
        }
    };

    useEffect(() => {
        setWaitingMessage(searching);
        const debounceTimer = setTimeout(() => {
            fetchBooksByTitleOrAuthor();
        }, 2000);
        return () => clearTimeout(debounceTimer);
    }, [titleOrAuthor]);

    if (titleOrAuthor === "") {
        return <h1 className={"bookSearchListContainer--" + theme}></h1>;
    }
    if (titleOrAuthor != "" && waitingMessage) {
        return <h2 className={"bookSearchListContainer--" + theme}>{waitingMessage}</h2>;
    }

    return (
        <>
            <div className={"bookSearchListContainer--" + theme}>
                <h2>
                    {books && books.length > 1
                        ? `(${books.length}) books found`
                        : `(${books?.length}) book found`}
                </h2>
                <div className={books && books.length > 1 ? "bookSearchListContainer" : "bookSearchListContainer--center"}>
                    {books &&
                        Array.isArray(books) &&
                        books
                            .sort((a, b) => b.book.id - a.book.id)
                            .map((bookDetail) => (
                                <BookCard
                                    key={bookDetail.book.id}
                                    book={bookDetail.book}
                                />
                            ))}
                </div>
            </div>
        </>
    );
};
