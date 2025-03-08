import { useContext } from "react";
import { ThemeContext } from "../../App/App";
import "./About.css";
import openAiSvg from "../../media/openai.svg";

export const About = () => {
    const theme = useContext(ThemeContext);
    return (
        <>
            <section className={`About About--${theme} About_container`}>
                <h2 className={`About About--${theme} About_title`}>ReadSphere</h2>
                <article className={`About About--${theme} About_article`}>
                    Your Personalized Short Stories and Book Library Platform<br /> 
                    <br/>
                    Featuring a sleek interface, curated book recommendations,
                    and an exciting integration with OpenAI <img src={openAiSvg} alt="openAiImage"/> to generate your own short stories,
                    <br/>
                    ReadSphere makes it effortless to discover books and stories tailored to your unique interests.<br/>
                    <br/>
                    Whether you're searching by title, author, or genre, or exploring top-rated reads,
                    ReadSphere is your ultimate companion for all things reading.<br/>
                    <br/>
                    Although ReadSphere is still in development,
                    you can already take a sneak peek and start enjoying its features.<br/>
                    <br/>
                    Dive in and explore!
                </article>
            </section>
        </>
    );
}