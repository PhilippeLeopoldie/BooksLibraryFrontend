import "../SideBar/SideBar.css"
import { Settings } from "../Settings/Settings";
import { ThemeContext } from "../App/App";
import { useState } from "react";


type SideBarType = {
    theme: string,
    handleTheme: () => void;
}


export const SideBar = ({ theme, handleTheme }: SideBarType) => {

    const [sideBarActivated, setSideBarActivated] = useState<boolean>(false);

    const handleSideBar = () => {
        setSideBarActivated(!sideBarActivated);
    }

    return (
        <>
            <aside className={`SideBar_container 
                              ${sideBarActivated ? "SideBar_container--activated" : "SideBar_container--inactivated"}`}>
                <div
                    onClick={handleSideBar}
                    className={`SideBar ${sideBarActivated && "SideBar_activated"}--${theme}`}
                >
                    <hr className={`Lines Lines--${theme} Line1`}></hr>
                    <hr className={`Lines Lines--${theme} Line2`}></hr>
                    <hr className={`Lines Lines--${theme} Line3`}></hr>
                    
                </div>
                <div className={`SideBar_settings--${theme}`}>{sideBarActivated && <Settings theme={theme} handleTheme={handleTheme} />}</div>
            </aside>
        </>);
};