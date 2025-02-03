import { useContext, useEffect, useState } from "react";
import { ThemeContext, genresCacheContext } from "../../../App/App";
import { GenreButton } from "../../GenreButton/GenreButton";
import { ReadingRange } from "../ReadingRange/ReadingRange";
import "./AiUserPreferences.css";

export const AiUserPreferences = () => {
    const theme = useContext(ThemeContext);
    const listOfGenresContext = useContext(genresCacheContext);
    const listOfGenres = listOfGenresContext?.genresCache?.genres || [];
    const [userGenreIdPreference, setUserGenreIdPreferences] = useState<string>(
        sessionStorage.getItem("userGenreIdPreference") || "");
    
    const handleGenreSelection = (genreId: string) => {
        sessionStorage.setItem("userGenreIdPreference", genreId);
        setUserGenreIdPreferences(genreId);
    }

    useEffect(() => {
        console.log(userGenreIdPreference);
    }, [userGenreIdPreference]);

    return (
        <section className={`AiUserPreferences_container AiUserPreferences_container--${theme}`}>
                <section className='AiGenres'>
                {listOfGenres.map((genre) =>
                    <GenreButton key={genre.id} genre={genre} handleGenres={handleGenreSelection} typeOfChoice='single' />
                    )}
                </section>
                <ReadingRange/>
        </section>
    )
}