import { Context, useContext } from "react";
import { ThemeContext } from "../../App/App";
import { AiUserPreferences } from "../Preferences/AiUserPreferences/AiUserPreferences";
import { AiStory } from "../Story/AiStory/AiStory";
import "./StoryCard.css"

export const StoryCard = () => {
    const theme = useContext(ThemeContext);
    return (
        <section className={`StoryCard_container StoryCard_container--${theme}`}>
                <h2 className={`StoryCard_header--${theme}`}>Create your own short story</h2>
                <AiUserPreferences />
                <AiStory/>  
        </section>
    );
}