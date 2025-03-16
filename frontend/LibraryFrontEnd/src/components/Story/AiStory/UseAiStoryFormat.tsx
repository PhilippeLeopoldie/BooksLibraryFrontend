

export const UseAiStoryFormat = (aiStory: string) => {
    const titleMatch = aiStory.includes("Title:") ? aiStory.split("Title:")[1] : "";
    const storyMatch = titleMatch.includes("Story:") ? titleMatch.split("Story:") : ["", ""];
    const authorMatch = storyMatch[1].includes("Author:") ? storyMatch[1].split("Author:") : ["", ""];

    const title = storyMatch[0]?.trim() || "";
    const story = authorMatch[0]?.trim() || "";
    const author = authorMatch[1]?.trim() || "";

    return { title, story, author };
}