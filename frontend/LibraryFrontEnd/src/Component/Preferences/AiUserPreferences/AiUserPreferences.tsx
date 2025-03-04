import { useContext, useEffect, useState } from "react";
import { ThemeContext, genresCacheContext } from "../../../App/App";
import { GenreButton } from "../../GenreButton/GenreButton";
import { ReadingRange } from "../ReadingRange/ReadingRange";
import "./AiUserPreferences.css";
import { AiStory } from "../../Story/AiStory/AiStory";

type AiStorySettingsType = {
    language: "English" | "French" | "Swedish" | "Spanish",
    genreName: string,
    readingTime: string
}

export const AiUserPreferences = () => {
    const theme = useContext(ThemeContext);
    const listOfGenresContext = useContext(genresCacheContext);
    const listOfGenres = listOfGenresContext?.genresCache?.genres || [];
    const [userGenreIdPreference, setUserGenreIdPreferences] = useState<string>(
        sessionStorage.getItem("userGenreIdPreference") || "");
    const defaultSettings: AiStorySettingsType = { language: "English", genreName: "", readingTime: "5" };
    const [aiStorySettings, setAiStorySettings] = useState<AiStorySettingsType>(defaultSettings);

    const handleGenreSelection = (genreId: string) => {
        sessionStorage.setItem("userGenreIdPreference", genreId);
        setUserGenreIdPreferences(genreId);
        const genreName = listOfGenres.find((genre) => genre.id === genreId)?.name || "";
        setAiStorySettings({ ...aiStorySettings, genreName });
    }

    const readingTimeHandler = (readingTime: string) => {
        setAiStorySettings({ ...aiStorySettings, readingTime });
    }


    useEffect(() => {
        console.log(userGenreIdPreference);
    }, [userGenreIdPreference]);

    return (
        <section className={`AiUserPreferences_container AiUserPreferences_container--${theme}`}>
                <section className='AiGenres'>
                {listOfGenres.map((genre) =>
                    <GenreButton
                        key={genre.id}
                        genre={genre}
                        handleGenres={handleGenreSelection}
                        typeOfChoice='single'
                        sessionStorageName= 'userGenreIdPreference'
                    />
                    )}
            </section>
            <ReadingRange readingTime={readingTimeHandler } />
            <section className="story_section">
                <AiStory aiStorySettings={aiStorySettings} />
            </section>
        </section>

    )
}