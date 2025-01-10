import { useState } from "react";
import "../GenreButton/GenreButton.css";

type GenreButtonType = {
    genre: genreType,
    handleGenres: (genre: string) => void,
    typeOfChoice: string,
}

type genreType = {
    id: number,
    name: string
}



export const GenreButton = ({ genre, handleGenres, typeOfChoice }: GenreButtonType) => {   
    const [isClicked, setIsClicked] = useState<boolean>(false);
    const handleOneChoice = () => {
        handleGenres(genre.id.toString());
    }

    const handleMultiChoice = () => {
        setIsClicked(!isClicked);
        handleGenres(genre.id.toString());
    }
    const sessionStorageGenre = sessionStorage.getItem("userGenreIdPreference");
    const sessionStorageGenres = sessionStorage.getItem("userGenresIdPreference")?.split(",");

    let displayedContent: JSX.Element = <></>;
    if (typeOfChoice === 'oneChoice') {
        displayedContent = (< button
            className={`${sessionStorageGenre === genre.id.toString() ? 'Button--clicked' : 'Button--unclicked'}`}
            onClick={handleOneChoice}>
            {genre.name}
        </button>)
    }
    if (typeOfChoice === 'multiChoices') {
        displayedContent = (< button
            className={`${sessionStorageGenres?.includes(genre.id.toString()) ? 'Button--clicked' : 'Button--unclicked'
    }`}
            onClick={handleMultiChoice}>
            {genre.name}
        </button>)
    }

    return (
        <>
            {displayedContent}
        </>
    )
};