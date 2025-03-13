import { AiStoryLanguageType } from "../../../constants/types";
import "./AiStoryLanguage.css";
import { useContext, useState } from "react";
import { ThemeContext } from "../../../App/App";

type HandleLanguageType = {
    languageHandler: (language: AiStoryLanguageType) => void;
}

export const AiStoryLanguage = ({ languageHandler }: HandleLanguageType) => {
    const theme = useContext(ThemeContext);
    const languages = ["English", "French", "Swedish", "Spanish", "Italian", "Turkish"];
    const [language, setLanguage] = useState<AiStoryLanguageType>("English");

    const handleLanguage = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setLanguage(event.target.value as AiStoryLanguageType);
        languageHandler(event.target.value as AiStoryLanguageType);
    }

    return (
        <>
            <section className={ `AiStoryLanguage` }>
                <p className={`instructions instructions--${theme}`}>3. Choose your language:</p>
                <select
                    className={`AiStoryLanguage__select AiStoryLanguage__select--${theme}`}
                    value={language}
                    onChange={(event) => {
                        handleLanguage(event);
                    }}
                >
                    <option className={`AiStoryLanguage__select AiStoryLanguage__select--${theme}`} value="" disabled>Choose a language</option>
                    {languages.sort().map((language) => (
                    <option key={language} className={`AiStoryLanguage__select AiStoryLanguage__select--${theme}`} value={language}>{language}</option>
                ))}
                </select>
            </section>
        </>
    );
}