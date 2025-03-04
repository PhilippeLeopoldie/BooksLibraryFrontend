import "./AiStory.css";
import { ThemeContext } from "../../../App/App";
import { useContext, useState } from "react";
import { AI_STORY_URL } from "../../../constants/api";


type AiStorySettingsType = {
    language: "English" | "French" | "Swedish" | "Spanish",
    genreName: string,
    readingTime: string
}
export const AiStory = ({ aiStorySettings }: {aiStorySettings :AiStorySettingsType }) => {
    const theme = useContext(ThemeContext);
    const [activated, setActivated] = useState<Boolean>(false);
    const [aiStory, setAiStory] = useState<string>("");
    const activateStory = () => {
        setActivated(!activated);
    }

    const PostAistory = async () => {
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
                setAiStory(body.story);
                activateStory();
            } else if (storyResponse.status === 404) {
                setAiStory("Something went wrong! please try later...");
                activateStory();
            }
        } catch (error) {
            console.error(`Error generating story`,error);
        };
    }
    return (
        <>
            <button
                className={`AiStoryButton AiStoryButton--${theme} AiStory`}
                onClick={async () => { await PostAistory() }}
            >
                Generate Story
            </button>
            <section className={`AiStory--${theme} AiStory`}>
                <h3 className={`AiStory--${theme} AiStory__activated--${activated}`}>
                    {aiStory}
                </h3>
            </section>
        </>
    )
}