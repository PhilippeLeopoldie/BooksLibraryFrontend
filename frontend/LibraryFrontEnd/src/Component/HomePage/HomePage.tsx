import "./HomePage.css";
import { BooksByGenre } from "./BooksByGenre/BooksByGenre";
import { GenreFilter } from "./GenreFilter/GenreFilter";
import { NewBooks } from "./NewBooks/NewBooks";
import { PopularBooks } from "./PopularBooks/PopularBooks";
import { useContext, useEffect, useState } from "react";
import { FilteredGenreContext, ThemeContext} from "../../App/App";

export const HomePage = () => {
    const theme = useContext(ThemeContext);
    const genreContext = useContext(FilteredGenreContext);
    const [numberOfBooks, setNumberOfBooks] = useState<number>(3);
    const [displayedContent, setDisplayedContent] = useState<JSX.Element>(<></>);

    
    useEffect(() => {
        if (genreContext && genreContext.genreFilter !== 'All') {
            setDisplayedContent(
                <section className={`booksByGenre_container booksByGenre_container--${theme}`}>
                    <BooksByGenre sessionStorageName={"genreFiltered"} />
                </section>
            );
        } else {
            setDisplayedContent(
                <>
                    <PopularBooks maxNumBooks={`${numberOfBooks}`} />
                    <NewBooks />
                </>
            );
        }
    }, [genreContext?.genreFilter, theme])

    return (
        <>
            <div className={`BookList--${theme}--flex`}>
                <GenreFilter />
                {displayedContent}
            </div>
        </>
    );
};
