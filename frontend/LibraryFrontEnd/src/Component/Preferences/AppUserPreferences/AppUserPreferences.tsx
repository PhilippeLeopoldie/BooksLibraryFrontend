import { useContext, useEffect, useState } from "react";
import { ThemeContext,genresCacheContext } from "../../../App/App";
import "./AppUserPreferences.css";
import { GenreButton } from "../../GenreButton/GenreButton";
//import { genres } from "../../../constants/genres"

export const AppUserPreferences = () => {
    const theme = useContext(ThemeContext); 
    const listOfGenresContext = useContext(genresCacheContext);
    const listOfGenres = listOfGenresContext?.genresCache?.genres;
    const storedGenres = sessionStorage.getItem("userGenresPreference");
    const [userGenresPreference, setUserGenresPreference] = useState<string>(
        () => {
            return storedGenres ? storedGenres : "";
           
        }
    );

    const handleMultipleGenres = (genre: string) => {
        setUserGenresPreference((initialListOfGenres) => {
            const listOfGenres = initialListOfGenres ? initialListOfGenres.split(",") : [];
            const genreAlreadyExists = listOfGenres.includes(genre);
            let updatedGenres: string[];

            if (genreAlreadyExists) {
                // Remove the genre if it already exists
                updatedGenres = listOfGenres.filter((element) => element !== genre);
            } else {
                // Add the genre if it doesn't exist
                updatedGenres = [...listOfGenres, genre];
            }
            sessionStorage.setItem("userGenresPreference", updatedGenres.join(","));

            return updatedGenres.join(",");
        });
    }


    useEffect(() => {
        console.log(userGenresPreference);

    }, [userGenresPreference]);

    return (
        <>
            <section className={`Preferences_container Preferences_container--${theme}`}>
                <label className="DropDownMenu_label" htmlFor="toggleCheckbox">My genres preferences
                    <svg data-encore-id="arrow" className="arrow_container" role="img" aria-hidden="true" width="16" height="16" viewBox="0 0 16 16" >
                        <path className={`arrow arrow--${theme}`}
                        d="M7.19 1A.749.749 0 0 1 8.47.47L16 7.99l-7.53 7.521a.75.75 0 0 1-1.234-.815.75.75 0 0 1 
                           .174-.243l5.72-5.714H.75a.75.75 0 1 1 0-1.498h12.38L7.41 1.529a.749.749 0 0 1-.22-.53z">
                        </path>
                    </svg>
                </label>
                <input className="DropDownMenu_ckeckbox" type="checkbox" id="toggleCheckbox"/>
                <form onSubmit={(e) => e.preventDefault()} className="Preferences_form">
                    <section className='Genres'>
                        {listOfGenres?.map((genre) =>
                            <GenreButton key={genre.id} name={genre.name} handleGenres={handleMultipleGenres} typeOfChoice="multiChoices" />
                        )}  
                    </section>                    
                </form>
            </section>
        </>
    );
}