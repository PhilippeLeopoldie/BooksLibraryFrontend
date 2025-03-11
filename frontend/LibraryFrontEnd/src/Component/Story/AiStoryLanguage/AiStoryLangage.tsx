import { AiStoryLanguageType } from "../../../constants/types";
import { useContext, useState } from "react";
import { ThemeContext } from "../../../App/App";

type HandleLanguageType = {
    languageHandler: (language: AiStoryLanguageType) => void;
}

export const AiStoryLanguage = ({ languageHandler }: HandleLanguageType) => {
    const theme = useContext(ThemeContext);
    const [language, setLanguage] = useState<AiStoryLanguageType>("English");

    const handleLanguage = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setLanguage(event.target.value as AiStoryLanguageType);
        languageHandler(event.target.value as AiStoryLanguageType);
    }

    return (
        <>
            <section className={`AiStoryLanguage AiStoryLanguage--${theme}` }>
                <p className={`instructions instructions--${theme}`}>Choose your language:</p>
                <select
                    className={`AiStoryLanguage__select AiStoryLanguage__select--${theme}`}
                    value={language}
                    onChange={(event) => {
                        handleLanguage(event);
                    }}
                >
                    <option className={`AiStoryLanguage__select AiStoryLanguage__select--${theme}`} value="" disabled>Choose a language</option>
                    <option className={`AiStoryLanguage__select AiStoryLanguage__select--${theme}`} value="English">English</option>
                    <option className={`AiStoryLanguage__select AiStoryLanguage__select--${theme}`} value="French">French</option>
                    <option className={`AiStoryLanguage__select AiStoryLanguage__select--${theme}`} value="Swedish">Swedish</option>
                    <option className={`AiStoryLanguage__select AiStoryLanguage__select--${theme}`} value="Spanish">Spanish</option>
                </select>
            </section>
        </>
    );
}