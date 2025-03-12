import "./AiStoryForm.css";
import { useContext } from "react";
import { ThemeContext } from "../../../App/App";


type AiStoryFormatType = {
    title: string,
    story: string,
    author: string
}

export const AiStoryForm = ({ generatedStory }: {generatedStory: AiStoryFormatType}) => {
    const theme = useContext(ThemeContext);
    return (
        <>
            <article className={`aiStoryFormat__container aiStoryFormat__container--${theme}`}>
                <header className="aiStoryFormat__title">
                    <h3>{generatedStory.title}</h3>
                </header>
                <section className="aiStoryFormat__story">
                    <p>{generatedStory.story}</p>
                </section>
                <footer className="aiStoryFormat__author">
                    <p>by:{generatedStory.author}</p>
                </footer>
            </article>
        </>
    );
}