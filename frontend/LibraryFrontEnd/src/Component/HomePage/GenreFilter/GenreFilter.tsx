import { GenreButton } from "../../GenreButton/GenreButton";
import "./GenreFilter.css";
import { useContext, useEffect, useState } from "react";
import { ThemeContext, genresCacheContext, FilteredGenreContext } from "../../../App/App";
import { GenreType } from "../../../constants/types";

export const GenreFilter = () => {
    const theme = useContext(ThemeContext);
    const listOfGenresContext = useContext(genresCacheContext);
    const listOfGenres = listOfGenresContext?.genresCache?.genres || [];
    const genreContext = useContext(FilteredGenreContext);

    const allGenre: GenreType = {
        id: 'All',
        name: 'All'
    }

    const handleSelectedGenre = (genreId: string) => {
        sessionStorage.setItem("genreFiltered", genreId);
        genreContext?.setGenreFilter(genreId);
    }

    useEffect(() => {
        if (!sessionStorage.getItem("genreFiltered")) 
        handleSelectedGenre('All');
    }, [])

    return (
        <>
            <section className={`genreFilter_container genreFilter_container--${theme}`}>
                <GenreButton
                    genre={allGenre}
                    handleGenres={handleSelectedGenre}
                    typeOfChoice='single'
                    sessionStorageName='genreFiltered'
                />
                {
                    listOfGenres.map((genre) =>
                        <GenreButton
                            key={genre.id}
                            genre={genre}
                            handleGenres={handleSelectedGenre}
                            typeOfChoice='single'
                            sessionStorageName='genreFiltered'
                        />)
                }
            </section>
        </>
    )
}