import { useState } from "react";
import "../GenreButton/GenreButton.css";

type GenreButtonType = {
    genre: genreType,
    handleGenres: (genre: string) => void,
    typeOfChoice: 'single' | 'multiple',
    sessionStorageName: string
}

type genreType = {
    id: number,
    name: string
}



export const GenreButton = ({ genre, handleGenres, typeOfChoice, sessionStorageName }: GenreButtonType) => {   
    const [isClicked, setIsClicked] = useState<boolean>(false);
    const handleSingleChoice = () => {
        handleGenres(genre.id.toString());
    }

    const handleMultiChoice = () => {
        setIsClicked(!isClicked);
        handleGenres(genre.id.toString());
    }
    const sessionStorageGenre = sessionStorage.getItem(sessionStorageName)?.split(",");

    let displayedContent: JSX.Element = <></>;
    if (typeOfChoice === 'single') {
        displayedContent = (< button
            className={`${sessionStorageGenre?.at(0) === genre.id.toString() ? 'genreButton Button--clicked' : 'genreButton Button--unclicked'}`}
            onClick={handleSingleChoice}>
            {genre.name}
        </button>)
    }
    if (typeOfChoice === 'multiple') {
        displayedContent = (< button
            className={`${sessionStorageGenre?.includes(genre.id.toString()) ? 'genreButton Button--clicked' : 'genreButton Button--unclicked'
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