import { BookCard } from "../../BookCard/BookCard";
import { BookType, PaginatedBookType, PaginationType } from "../../../constants/types";
import { useContext, useEffect, useState } from "react";
import { ThemeContext, topBooksCacheContext } from "../../../App/App";
import { BOOK_TOP_BOOK_URL } from "../../../constants/api";
import OpenAi from "../../../media/openAi.svg";
import { WaitingImage } from "../../../constants/WaitingImage/WaitingImage"; 


export const PopularBooks = ({ maxNumBooks }: { maxNumBooks: string })  => {
    const theme = useContext(ThemeContext);
    const topBooksCache = useContext(topBooksCacheContext);
    const [topBooks, setTopBooks] = useState<BookType[] | undefined | null>(topBooksCache?.topBooksCache);

    const fetchTopBook = async () => {
        try {
            const topBookResponse: Response = await fetch(`${BOOK_TOP_BOOK_URL}${maxNumBooks}`);
            if (topBookResponse.status === 200) {
                const topBooksResponseData = await topBookResponse.json();
                setTopBooks(topBooksResponseData.books);
                topBooksCache?.setTopBooksCache(topBooksResponseData.books);
            } else if (topBookResponse.status === 404) {
                console.log(topBookResponse);
            }
        } catch (error) {
            console.error("Error fetching TopBook:", error);
        }
    };

    useEffect(() => {
        if (!topBooks || topBooks.length === 0) fetchTopBook();
    }, []);

    if (!topBooks) {
        return <div className={"Books__Loading--" + theme}>
            <WaitingImage waitingImage={OpenAi} />
        </div>;
    }

    return (
        <>
            <h1 className="BookListTitle">Popular</h1>
            <div className="bookListContainer--flex">
                {topBooks?.map((topBook) => (
                    <BookCard key={topBook.id} book={topBook} />
                ))}
            </div>
        </>
    )
};