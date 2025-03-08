import "./AiStory.css";
import { ThemeContext } from "../../../App/App";
import { useContext, useState } from "react";
import { AI_STORY_URL } from "../../../constants/api";
import { act } from "react-dom/test-utils";


type AiStorySettingsType = {
    language: "English" | "French" | "Swedish" | "Spanish",
    genreName: string,
    readingTime: string
}
export const AiStory = ({ aiStorySettings }: {aiStorySettings :AiStorySettingsType }) => {
    const theme = useContext(ThemeContext);
    const waitingMessage = "Generating story...";
    const errorMessage = "Something went wrong! please try later...";
    const [activated, setActivated] = useState<Boolean>(false);
    const [displayedContent, setDisplayedContent] = useState<JSX.Element>(<>{waitingMessage}</>);
    const activateStory = (boolean: boolean) => {
        setActivated(boolean);
    }
     

    const GenerateAiStory = async () => {
        setDisplayedContent(<>{waitingMessage}</>);
        activateStory(true);
        try {
            const requestOptions = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    language: aiStorySettings.language,
                    genre: aiStorySettings.genreName,
                    readingTime: aiStorySettings.readingTime
                })
            };
            const storyResponse: Response = await fetch(AI_STORY_URL, requestOptions);
            if (storyResponse.status === 201) {
                const body = await storyResponse.json();
                setDisplayedContent(<>{body.story}</>);
            } else if (storyResponse.status === 404) {
                setDisplayedContent(<>{errorMessage}</>);
            }
        } catch (error) {
            console.error(`Error generating story`,error);
        };
    }
    return (
        <>
            <button
                className={`AiStoryButton AiStoryButton--${theme} AiStoryElement`}
                onClick={async () => { await GenerateAiStory() }}
            >
                <label className={`instructions instructions--${theme}`}>Generate Story</label>
            </button>
            <section className={`AiStory--${theme} AiStoryElement AiStoryTextContainer`}>
                <h3 className={`AiStory--${theme} AiStory__activated--${activated}`}>
                    {displayedContent}
                </h3>
            </section>
        </>
    )
}