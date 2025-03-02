import { useState } from "react";
import { Link } from "react-router-dom";
import addIcone from "../../media/add20px.svg";
import addBlueIcone from "../../media/add_blue_20px.svg";
import bookIcone from "../../media/book48px.svg";
import bookBlueIcone from "../../media/book_blue_48px.svg";
import homeIcone from "../../media/home_48px.svg";
import homeBlueIcone from "../../media/home_blue_48px.svg";
import "./NavBar.css"
import searchIcone from "../../media/search48px.svg";
import searchBlueIcone from "../../media/search_blue_48px.svg";

type NavBarType = {
    theme: string,
    handleTheme: () => void
};

export const NavBar = ({ theme, handleTheme }: NavBarType) => {
    const [activeNavItem, setActiveNavItem] = useState<string>("home");

    return (
        <>
            <nav className={`navbar--grid navbar--${theme}`}>
                <Link
                    className="nav-link nav__home__Link--flex"
                    to="/"
                    onClick={() => {
                        setActiveNavItem("home");                    
                    }}
                >
                    <img
                        className="nav-link icone nav__HomeIcone"
                        src={activeNavItem === "home" ? homeBlueIcone : homeIcone}
                        alt="Home"
                    />      
                    <figcaption
                        className={
                            activeNavItem === "home"
                                ? "iconeTitle--blue nav__Home__title"
                                : "iconeTitle nav__Home__title"
                        }
                    >
                        Home
                    </figcaption>
                </Link>
                <Link
                    className="nav-link nav__search__link--flex"
                    to="/Search"
                    onClick={() => {
                        setActiveNavItem("search");
                    }}
                >
                    <img
                        className="nav-link icone nav__search__image"
                        src={activeNavItem === "search" ? searchBlueIcone : searchIcone}
                        alt="Search"
                    />
                    <figcaption
                        className={
                            activeNavItem === "search"
                                ? "iconeTitle--blue nav__search__title"
                                : "iconeTitle nav__search__title"
                        }
                    >
                        Search
                    </figcaption>
                </Link>
                <Link
                    className="nav-link nav__createStory--flex"
                    to="/createStory"
                    onClick={() => {
                        setActiveNavItem("createStory");
                    }}
                >
                    <img
                        className="nav-link icone nav__createStory"
                        src={activeNavItem === "createStory" ? bookBlueIcone : bookIcone}
                        alt="CreateStory"
                    />
                    <figcaption
                        className={
                            activeNavItem === "createStory"
                                ? "iconeTitle--blue nav__createStory__Title"
                                : "iconeTitle nav__createStory__Title"
                        }
                    >
                        A.I. Story
                    </figcaption>
                </Link>
                {/*<Link
                    className="nav-link nav__addBook--flex"
                    to="/addBook"
                    onClick={() => {
                        setActiveNavItem("addBook");
                    }}
                >
                    <img
                        className="nav-link icone nav__addBook"
                        src={activeNavItem === "addBook" ? bookBlueIcone : bookIcone}
                        alt="book"
                    />
                    <img
                        className="nav-link addIcone"
                        src={activeNavItem === "addBook" ? addBlueIcone : addIcone}
                        alt="add"
                    />
                    <figcaption
                        className={
                            activeNavItem === "addBook"
                                ? "iconeTitle--blue nav__AddBook__Title"
                                : "iconeTitle nav__AddBook__Title"
                        }
                    >
                        Add Book
                    </figcaption>
                </Link>*/}
            </nav>
        </>
    );
};
