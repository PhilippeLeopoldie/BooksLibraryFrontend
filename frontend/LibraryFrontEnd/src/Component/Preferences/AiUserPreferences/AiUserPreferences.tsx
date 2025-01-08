import { useContext, useEffect, useState } from "react";
import { ThemeContext, genresCacheContext } from "../../../App/App";
import { GenreButton } from "../../GenreButton/GenreButton";
import { ReadingRange } from "../ReadingRange/ReadingRange";
import "./AiUserPreferences.css";

export const AiUserPreferences = () => {
    const theme = useContext(ThemeContext);
    const listOfGenresContext = useContext(genresCacheContext);
    const listOfGenres = listOfGenresContext?.genresCache?.genres || [];
    const [userGenrePreference, setUserGenrePreferences] = useState<string>(
        sessionStorage.getItem("userGenrePreference") || "");
    
    const handleGenreSelection = (genre: string) => {
        sessionStorage.setItem("userGenrePreference", genre);
        setUserGenrePreferences(genre);
    }

    useEffect(() => {
        console.log(userGenrePreference);
    }, [userGenrePreference]);

    return (
        <section className={`AiUserPreferences_container AiUserPreferences_container--${theme}`}>
                <section className='AiGenres'>
                {listOfGenres.map((genre) =>
                    <GenreButton key={genre.id} name={genre.name} handleGenres={handleGenreSelection} typeOfChoice="oneChoice" />
                    )}
                </section>
                <ReadingRange/>
        </section>
    )
}