import "../SideBar/SideBar.css"
import { AppSettings } from "../AppSettings/AppSettings";
import { ThemeContext } from "../../App/App";
import { useEffect, useRef, useState } from "react";


type SideBarType = {
    theme: string,
    handleTheme: () => void;
}


export const SideBar = ({ theme, handleTheme }: SideBarType) => {
    const [sideBarActivated, setSideBarActivated] = useState<boolean>(false);
    const sidebarRef = useRef<HTMLElement | null>(null);

    const handleSideBar = () => {
        setSideBarActivated(!sideBarActivated);
    };

    const handleOutsideClick = (event: MouseEvent) => {
        if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node))
            setSideBarActivated(false);
    };

    useEffect(() => {
        if (sideBarActivated) {
            document.addEventListener('mousedown', handleOutsideClick);
        } else {
            document.removeEventListener('mousedown', handleOutsideClick);
        }

        return () => document.removeEventListener('mousedown', handleOutsideClick);
    }, [sideBarActivated]);

    return (
        <>
            <aside ref={sidebarRef} className={`SideBar_container 
                              ${sideBarActivated ? "SideBar_container--activated" : "SideBar_container--inactivated"}`}>
                <section
                    onClick={handleSideBar}
                    className={`SideBar ${sideBarActivated ? "SideBar_activated" : "SideBar_inactivated"}--${theme}`}
                >
                    <hr className={`Lines Lines--${theme} Line1`}></hr>
                    <hr className={`Lines Lines--${theme} Line2`}></hr>
                    <hr className={`Lines Lines--${theme} Line3`}></hr>
                    
                </section>
                <section className={` SideBar_settings--${theme}
                ${sideBarActivated ? "SideBar_settings--activated" : "SideBar_settings--inactivated"}`}>
                    {sideBarActivated && <AppSettings theme={theme} handleTheme={handleTheme} />}
                </section>
            </aside>
        </>);
};