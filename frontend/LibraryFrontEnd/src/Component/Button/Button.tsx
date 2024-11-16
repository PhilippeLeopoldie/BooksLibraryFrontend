import { useContext, useEffect, useState } from "react";
import { ButtonContext } from "../App/App";
import "../Button/Button.css";

type ButtonType = {
    name: string,
    handleGenres: (genre: string) => void,
    typeOfChoice: string,
}



export const Button = ({ name, handleGenres, typeOfChoice }: ButtonType) => {
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