import "./AiStory.css";
import { ThemeContext } from "../../../App/App";
import { useContext, useEffect, useRef, useState } from "react";
import { AI_STORY_URL } from "../../../constants/api";
import { AiStoryForm } from "./AiStoryForm";
import { AiStoryLanguageType } from "../../../constants/types";
import openAiSvg from "../../../media/openAi.svg";
import { UseAiStoryFormat } from "./UseAiStoryFormat";
import { WaitingImage } from "../../../constants/WaitingImage/WaitingImage";


type AiStorySettingsType = {
    language: AiStoryLanguageType,
    genreName: string,
    readingTime: string
}
type AiStoryFormatType = {
    title: string,
    story: string,
    author: string
}

export const AiStory = ({ aiStorySettings }: {aiStorySettings :AiStorySettingsType }) => {
    const theme = useContext(ThemeContext);
    const errorMessage = "Something went wrong! please try later...";
    const storyRef = useRef<HTMLDivElement | null>(null);
    const [activated, setActivated] = useState<Boolean>(false);
    const [displayedContent, setDisplayedContent] = useState<JSX.Element>(<></>);
    const activateStory = (boolean: boolean) => {
        setActivated(boolean);
    }
     

    const GenerateAiStory = async () => {
        activateStory(true);
        setDisplayedContent(<WaitingImage waitingImage={openAiSvg}/>);
        
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
                const formatedGeneratedStory: AiStoryFormatType = UseAiStoryFormat(body.story);
                setDisplayedContent(<AiStoryForm generatedStory={formatedGeneratedStory} />);
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