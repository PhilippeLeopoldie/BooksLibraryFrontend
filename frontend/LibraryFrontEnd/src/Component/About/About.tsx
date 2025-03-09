import { useContext } from "react";
import { ThemeContext } from "../../App/App";
import "./About.css";
import openAiSvg from "../../media/openAi.svg";
import { Link } from "react-router-dom";

export const About = () => {
    const theme = useContext(ThemeContext);
    return (
        <>
            <section className={`instructions instructions--${theme} About_container`}>
                <h2 className={`instructions instructions--${theme} About_title`}>ReadSphere<br/><br/></h2>
                <article className={`instructions instructions--${theme} About_article`}>
                    Your Personalized Short Stories and Book Library Platform.<br/> 
                    <br/>
                    Featuring a sleek interface, curated book recommendations,
                    and an exciting integration with {' '}
                    <Link className={`instructions instructions--${theme} OpenAiLink`} to="https://openai.com/">
                        <span className={`instructions OpenAiText`} >OpenAI
                            <img className="icone" src={openAiSvg} alt="openAiImage" />
                        </span> 
                    </Link>
                    {' '}to generate your own short stories.<br />
                    <br />
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