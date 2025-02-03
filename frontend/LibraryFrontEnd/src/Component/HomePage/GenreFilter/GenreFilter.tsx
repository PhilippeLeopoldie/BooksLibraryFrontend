import { GenreButton } from "../../GenreButton/GenreButton";
import "./GenreFilter.css";
import { useContext, useEffect, useState } from "react";
import { ThemeContext, genresCacheContext } from "../../../App/App";

export const GenreFilter = () => {
    const theme = useContext(ThemeContext);
    const listOfGenresContext = useContext(genresCacheContext);
    const listOfGenres = listOfGenresContext?.genresCache?.genres || [];
    const [genreFilter, setGenreFilter] = useState<string>(
        sessionStorage.getItem("genreFiltered") || ""
    );

    const handleGenreFiltered = (genreId: string) => {
        sessionStorage.setItem("genreFiltered", genreId);
        setGenreFilter(genreId);
    }

    useEffect(() => {
        console.log(genreFilter);
    }, [genreFilter]);


    return (
        <>
            <section className={`genreFilter_container genreFilter_container--${theme}`}>
                {
                    listOfGenres.map((genre) =>
                        <GenreButton
                            key={genre.id}
                            genre={genre}
                            handleGenres={handleGenreFiltered}
                            typeOfChoice='single'
                            sessionStorageName='genreFiltered'
                        />)
                }
            </section>

        </>
    )
}