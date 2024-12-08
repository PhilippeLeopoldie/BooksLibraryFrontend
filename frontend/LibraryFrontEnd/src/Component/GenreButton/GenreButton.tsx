import { useContext, useEffect, useState } from "react";
import { ButtonContext } from "../../App/App";
import "../GenreButton/GenreButton.css";

type GenreButtonType = {
    name: string,
    handleGenres: (genre: string) => void,
    typeOfChoice: string,
}



export const GenreButton = ({ name, handleGenres, typeOfChoice }: GenreButtonType) => {
    const buttonContext = useContext(ButtonContext);
    const [isClicked, setIsClicked] = useState<boolean>(false);
    const handleOneChoice = () => {
        buttonContext?.setButtonStatus(name);
        handleGenres(name);
    }

    const handleMultiChoice = () => {
        setIsClicked(!isClicked);
        handleGenres(name);
    }

    let displayedContent: JSX.Element = <></>;
    if (typeOfChoice === 'oneChoice') {
        displayedContent = (< button
            className={`${buttonContext?.buttonStatus === name ? 'Button--clicked' : 'Button--unclicked'}`}
            onClick={handleOneChoice}>
            {name}
        </button>)
    }
    if (typeOfChoice === 'multiChoices') {
        displayedContent = (< button
            className={`${isClicked ? 'Button--clicked' : 'Button--unclicked'}`}
            onClick={handleMultiChoice}>
            {name}
        </button>)
    }

    return (
        <>
            {displayedContent}
        </>
    )
};