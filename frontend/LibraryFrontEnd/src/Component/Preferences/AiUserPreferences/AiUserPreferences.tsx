import { useContext, useState } from "react";
import { ThemeContext } from "../../../App/App";
import { genres } from "../../../constants/genres";
import { GenreButton } from "../../GenreButton/GenreButton";
import { ReadingRange } from "../ReadingRange/ReadingRange";
import "./AiUserPreferences.css";

export const AiUserPreferences = () => {
    const theme = useContext(ThemeContext);
    const [Genre, setGenre] = useState<string>("");

    const handleGenre = (genre: string) => {
        setGenre(genre);
    }
    return (
        <section className={`AiUserPreferences_container AiUserPreferences_container--${theme}`}>
                <section className='AiGenres'>
                    {genres.sort().map((genre, index) =>
                        <GenreButton key={index} name={genre} handleGenres={handleGenre} typeOfChoice="oneChoice" />
                    )}
                </section>
                <ReadingRange/>
        </section>
    )
}