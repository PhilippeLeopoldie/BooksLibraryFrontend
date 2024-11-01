import { useContext } from "react";
import { ThemeContext } from "../App/App";
import "./UserPreferences.css";

export const UserPreferences = () => {
    const theme = useContext(ThemeContext);
    return (
        <>
            <h3 className={`Preferences Preferences_container--${theme}`}>Set up my preferences (in development...)</h3>
        </>
    );
}