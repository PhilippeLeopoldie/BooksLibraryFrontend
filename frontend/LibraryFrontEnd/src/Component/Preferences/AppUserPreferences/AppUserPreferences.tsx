import { useContext, useState } from "react";
import { ThemeContext } from "../../../App/App";
import "./AppUserPreferences.css";
import { GenreButton } from "../../GenreButton/GenreButton";
import { genres } from "../../../constants/genres"

export const AppUserPreferences = () => {
    const theme = useContext(ThemeContext); 
    const [Genres, setGenres] = useState<string[]>([]);
    const handleMultipleGenres = (genre: string) => {
        setGenres((prevGenres) =>
            prevGenres.includes(genre) ?
                prevGenres.filter((g) => g !== genre) :
                [...prevGenres, genre]
        );
    }
    return (
        <>            
            <section className={`Preferences_container Preferences_container--${theme}`}>
                <label className="DropDownMenu_label" htmlFor="toggleCheckbox">My genres preferences... </label>
                <input className="DropDownMenu_ckeckbox" type="checkbox" id="toggleCheckbox"/>
                <form onSubmit={(e) => e.preventDefault()} className="Preferences_form">
                    <section className='Genres'>
                        {genres.sort().map((genre, index) =>
                            <GenreButton key={index} name={genre} handleGenres={handleMultipleGenres} typeOfChoice="multiChoices"/>
                        )}  
                    </section>                    
                </form>
            </section>
        </>
    );
}