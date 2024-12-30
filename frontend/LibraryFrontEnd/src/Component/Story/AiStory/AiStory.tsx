import "./AiStory.css";
import { ThemeContext } from "../../../App/App";
import { useContext, useState } from "react";

export const AiStory = () => {
    const theme = useContext(ThemeContext);
    const [activated, setActivated] = useState<Boolean>(false);

    const activateStory = () => {
        setActivated(!activated);
    }
    return (
        <>
            <button
                className={`AiStoryButton AiStoryButton--${theme} AiStory`}
                onClick={activateStory}
            >
                Generate Story
            </button>
            <section className={`AiStory--${theme} AiStory`}>
                <h3 className={`AiStory--${theme} AiStory__activated--${activated}`}>
                    Oups! This feature is still in development. Come back soon!
                </h3>
            </section>
        </>
    )
}