import { useContext, useEffect, useState } from "react";
import { ThemeContext, genresCacheContext } from "../../../App/App";
import { GenreButton } from "../../GenreButton/GenreButton";
import { ReadingRange } from "../ReadingRange/ReadingRange";
import "./AiUserPreferences.css";
import { AiStory } from "../../Story/AiStory/AiStory";
import { AiStoryLanguage } from "../../Story/AiStoryLanguage/AiStoryLangage";
import { AiStoryLanguageType } from "../../../constants/types"; 

type AiStorySettingsType = {
    language: AiStoryLanguageType,
    genreName: string,
    readingTime: string
}

export const AiUserPreferences = () => {
    const theme = useContext(ThemeContext);
    const listOfGenresContext = useContext(genresCacheContext);
    const listOfGenres = listOfGenresContext?.genresCache?.genres || [];
    const [userGenreIdPreference, setUserGenreIdPreferences] = useState<string>(
        sessionStorage.getItem("userGenreIdPreference") || "");
    const [aiStorySettings, setAiStorySettings] = useState<AiStorySettingsType>({ language: "English", genreName: "", readingTime: "1" });

    const genreNamefromGenreId = (genreId: string) => {
        return listOfGenres.find((genre) => genre.id.toString() === genreId)?.name || "";;
    }

    const handleGenreSelection = (genreId: string) => {
        sessionStorage.setItem("userGenreIdPreference", genreId);
        setUserGenreIdPreferences(genreId);
    }

    const readingTimeHandler = (readingTime: string) => {
        setAiStorySettings({ ...aiStorySettings, readingTime });
    }

    const languageHandler = (language: AiStoryLanguageType) => {
        setAiStorySettings({ ...aiStorySettings, language });
    }

    useEffect(() => {
        if (userGenreIdPreference) {
            const genreName = genreNamefromGenreId(userGenreIdPreference);
            setAiStorySettings({ ...aiStorySettings, genreName });
        }
    }, [userGenreIdPreference]);

    return (
        <section className={`AiUserPreferences_container AiUserPreferences_container--${theme}`}>
            <p className={`instructions instructions--${theme}` } >1. Choose a genre:</p>
            <section className='AiGenres'>
                {listOfGenres.filter(genre => genre.isForStoryGeneration).map((genre) =>
                    <GenreButton
                        key={genre.id}
                        genre={genre}
                        handleGenres={handleGenreSelection}
                        typeOfChoice='single'
                        sessionStorageName='userGenreIdPreference'
                    />
                )}
            </section>
            <ReadingRange readingTimeHandler={readingTimeHandler} />
            <AiStoryLanguage languageHandler={languageHandler} />
            <section className="story_section">
                <AiStory aiStorySettings={aiStorySettings} />
            </section>
        </section>
    )
}