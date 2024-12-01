import React, { ChangeEvent, HtmlHTMLAttributes, useContext, useState } from "react";
import { ThemeContext } from "../App/App";
import "./UserPreferences.css";
import { Button } from "../Button/Button";

export const UserPreferences = () => {
    const theme = useContext(ThemeContext);
    const genres = ['Romance', 'Children', 'Fiction', 'Thrillers', 'Scary','Technology'];
    const [choosenGenres, setChoosenGenres] = useState<string[]>([]);
    const [choosenOneGenre, setChoosenOneGenre] = useState<string>("");
    const [selectedTime, setSelectedTime] = useState<string>("5");
    const [rangeValue, setRangeValue] = useState<string>("5");

    const handleRangeValue = (event: ChangeEvent<HTMLInputElement>) => {
        setRangeValue(event.target.value);
    }

    const handleSelectedTime = (event: ChangeEvent<HTMLInputElement>) => {
        setSelectedTime(event.target.value);
    }

    const handleMultipleChoosenGenres = (genre: string) => {
        setChoosenGenres((prevGenres) =>
            prevGenres.includes(genre) ?
                prevGenres.filter((g) => g !== genre) :
                [...prevGenres, genre]
        );
        console.log(`List of genres: ${choosenGenres}`)
    }

    const handleOneChoosenGenre = (genre: string) => {
        setChoosenOneGenre(genre);
        console.log(`Genre: ${choosenOneGenre}`)
    }

    
    return (
        <>            
            <section className={`Preferences_container Preferences_container--${theme}`}>
                <label className="DropDownMenu_label" htmlFor="toggleCheckbox">My stories preferences... </label>
                <input className="DropDownMenu_ckeckbox" type="checkbox" id="toggleCheckbox"/>
                <form onSubmit={(e) => e.preventDefault()} className="Preferences_form">
                    <section className='Genres'>
                        {genres.map((genre,index) =>
                            <Button key={index} name={genre} handleGenres={handleOneChoosenGenre} typeOfChoice="oneChoice" />
                        )}
                        
                    </section>
                    {/*<section className="ReadingTime">Reading time :
                        <label className="ReadingTime_label" htmlFor="checkbox_5min">5 min</label>
                        <input
                            className="ReadingTime_radio"
                            type="radio"
                            id="checkbox_5min"
                            value="5"
                            checked={selectedTime === "5"}
                            onChange={handleSelectedTime}
                        />
                        <label className="ReadingTime_label" htmlFor="checkbox_10min">10 min</label>
                        <input
                            className="ReadingTime_radio"
                            type="radio"
                            id="checkbox_10min"
                            value="10"
                            checked={selectedTime === "10"}
                            onChange={handleSelectedTime}
                        />
                        <label className="ReadingTime_label" htmlFor="checkbox_15min">15 min</label>
                        <input
                            className="ReadingTime_radio"
                            type="radio"
                            id="checkbox_15min"
                            value="15"
                            checked={selectedTime === "15"}
                            onChange={handleSelectedTime}
                        />
                    </section>*/}
                    <section className="ReadingRange"> Reading time:
                        <label className="rangeLabel" htmlFor="rangeInput">{`${rangeValue} min`}
                        </label>
                        <input
                            className="Reading_time_slider"
                            type="range" min="0" max="20" step="5"
                            value={rangeValue}
                            onChange={handleRangeValue}
                        >
                        </input>
                    </section>
                    <button className="generateStory">Generate Story</button>
                </form>
            </section>
            
        </>
    );
}