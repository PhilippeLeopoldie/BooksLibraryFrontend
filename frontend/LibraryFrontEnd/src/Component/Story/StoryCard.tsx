import { Context, useContext } from "react";
import { ThemeContext } from "../../App/App";
import { AiUserPreferences } from "../Preferences/AiUserPreferences/AiUserPreferences";
import "./StoryCard.css"

export const StoryCard = () => {
    const theme = useContext(ThemeContext);
    return (
        <section className={`StoryCard_container--flex StoryCard_container--${theme}`}>
            <h2 className={`StoryCard_header StoryCard_header--${theme}`}>Generate your own A.I. Short Story</h2>
                <AiUserPreferences />
        </section>
    );
}