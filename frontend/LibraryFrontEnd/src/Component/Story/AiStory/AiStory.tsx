import "./AiStory.css";
import { ThemeContext } from "../../../App/App";
import { useContext, useEffect, useRef, useState } from "react";
import { AI_STORY_URL } from "../../../constants/api";
import { AiStoryLanguageType } from "../../../constants/types"; 


type AiStorySettingsType = {
    language: AiStoryLanguageType,
    genreName: string,
    readingTime: string
}
export const AiStory = ({ aiStorySettings }: {aiStorySettings :AiStorySettingsType }) => {
    const theme = useContext(ThemeContext);
    const waitingMessage = "Generating story...";
    const errorMessage = "Something went wrong! please try later...";
    const storyRef = useRef<HTMLDivElement | null>(null);
    const [activated, setActivated] = useState<Boolean>(false);
    const [displayedContent, setDisplayedContent] = useState<JSX.Element>(<></>);
    const activateStory = (boolean: boolean) => {
        setActivated(boolean);
    }
     

    const GenerateAiStory = async () => {
        activateStory(true);
        setDisplayedContent(<>{waitingMessage}</>);
        
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

    useEffect(() => {
        if (activated && storyRef.current) {
            storyRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    }, [displayedContent]);


    return (
        <>
            <button
                className={`AiStoryButton AiStoryButton--${theme} AiStoryElement`}
                onClick={async () => { await GenerateAiStory() }}
            >
                <label className={`AiStoryButton__label AiStoryButton__label--${theme}`}>Generate Story</label>
            </button>
            <section ref={storyRef} className={`AiStory--${theme} AiStoryElement AiStoryTextContainer`}>
                <h3 className={`AiStory--${theme} AiStory__activated--${activated}`}>
                    {displayedContent}
                </h3>
            </section>
        </>
    )
}