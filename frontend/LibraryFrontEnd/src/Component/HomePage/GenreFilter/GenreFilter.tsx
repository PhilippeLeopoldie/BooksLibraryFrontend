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

    const recentGenre: GenreType = {
        id: 'Recent',
        name: 'Recent'
    }

    const popularGenre: GenreType = {
        id: 'Popular',
        name: 'Popular'
    }


    const handleSelectedGenre = (genreId: string) => {
        sessionStorage.setItem("genreFiltered", genreId);
        genreContext?.setGenreFilter(genreId);
    }

    
    useEffect(() => {
        (!sessionStorage.getItem("genreFiltered")) 
        // set default genre
        handleSelectedGenre('Popular');
    }, [])

    return (
        <>
            <section className={`genreFilter_container genreFilter_container--${theme}`}>
                <GenreButton
                    genre={popularGenre}
                    handleGenres={handleSelectedGenre}
                    typeOfChoice='single'
                    sessionStorageName='genreFiltered'
                />
                <GenreButton
                    genre={recentGenre}
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