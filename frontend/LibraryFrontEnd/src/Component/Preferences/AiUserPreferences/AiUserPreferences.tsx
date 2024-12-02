import { useContext, useState } from "react";
import { ThemeContext } from "../../App/App";
import { genres } from "../../../constants/genres";
import { GenreButton } from "../../GenreButton/GenreButton";
import { ReadingRange } from "../ReadingRange/ReadingRange";

export const AiUserPreferences = () => {
    const theme = useContext(ThemeContext);
    const [choosenOneGenre, setChoosenOneGenre] = useState<string>("");

    const handleOneChoosenGenre = (genre: string) => {
        setChoosenOneGenre(genre);
        console.log(`Genre: ${choosenOneGenre}`)
    }
    return (
        <section className={`Preferences_container Preferences_container--${theme}`}>
            <label className="DropDownMenu_label" htmlFor="toggleCheckbox">My stories preferences... </label>
            <input className="DropDownMenu_ckeckbox" type="checkbox" id="toggleCheckbox" />
            <form onSubmit={(e) => e.preventDefault()} className="Preferences_form">
                <section className='Genres'>
                    {genres.sort().map((genre, index) =>
                        <GenreButton key={index} name={genre} handleGenres={handleOneChoosenGenre} typeOfChoice="oneChoice" />
                    )}
                </section>
                <ReadingRange />
                <button className="generateStory">Generate Story</button>
            </form>
        </section>
    )
}