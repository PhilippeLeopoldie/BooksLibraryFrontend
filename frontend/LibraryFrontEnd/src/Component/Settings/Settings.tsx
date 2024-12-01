import "./Settings.css";
import { UserPreferences } from "../Preferences/UserPreferences/UserPreferences";
import darkMode from "../../media/dark-mode48px.svg";
import githubDarkMode from "../../media/github-DarkMode.svg";
import githubLightMode from "../../media/github-LightMode.svg";
import lightMode from "../../media/light-mode48px.svg";
import { Link } from "react-router-dom";

type SettingsType = {
    theme: string;
    handleTheme: () => void;
};


export const Settings = ({ theme, handleTheme }: SettingsType) => {
    return (
        <>
            <section className={`Settings--${theme} Settings_container`}>
                <header className={`Settings--${theme}`}>
                    <h2 className={`Settings--${theme}`}>Settings</h2>
                </header>
                <nav className={`Settings--${theme}`}>
                    <div className={`Settings Settings--${theme}`}><UserPreferences/></div>
                    <section onClick={handleTheme} className={`Settings_Theme Settings Settings--${theme}`} >
                        <img
                            className={` Settings--${theme}`}                           
                            src={theme === 'black' ? lightMode : darkMode}
                            alt="Light mode">
                        </img>
                        <figcaption  className={`Settings--${theme} Setting_ThemeTitle`} >
                            {theme === 'black' ? 'Light Mode' : 'Dark Mode'}
                        </figcaption>
                    </section>
                    <section className={`Settings--${theme} About`}>
                        <h3 className={`Settings Settings--${theme}`}>About</h3></section>
                    <section className={`Settings--${theme} Settings_Links--flex`}>
                        <Link className={`Settings--${theme}`} to="https://github.com/PhilippeLeopoldie">
                            <img
                                className={` Settings--${theme}`}
                                src={theme === 'black' ? githubDarkMode : githubLightMode}>
                            </img>
                            <figcaption className={`Settings Settings--${theme} GitHub`}>GitHub</figcaption>
                        </Link>
                    </section>
                </nav>
            </section>
        </>
    );
};


