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
    const numberOfPopularBooks = 6;
    const [displayedContent, setDisplayedContent] = useState<JSX.Element>(<></>);


    useEffect(() => {
        if (genreContext?.genreFilter === 'Popular') {
            setDisplayedContent(
                <PopularBooks maxNumBooks={`${numberOfPopularBooks}`} />
            );
        }
        else if (genreContext?.genreFilter !== 'Recent') {
            setDisplayedContent(
                <section className={`booksByGenre_container booksByGenre_container--${theme}`}>
                    <BooksByGenre sessionStorageName={"genreFiltered"} />
                </section>
            );
        } else {
            setDisplayedContent(
                <NewBooks />
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
