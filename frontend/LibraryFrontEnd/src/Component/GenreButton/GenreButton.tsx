import { useState } from "react";
import "../GenreButton/GenreButton.css";

type GenreButtonType = {
    genre: genreType,
    handleGenres: (genre: string) => void,
    typeOfChoice: 'single' | 'multiple',
}

type genreType = {
    id: number,
    name: string
}



export const GenreButton = ({ genre, handleGenres, typeOfChoice }: GenreButtonType) => {   
    const [isClicked, setIsClicked] = useState<boolean>(false);
    const handleSingleChoice = () => {
        handleGenres(genre.id.toString());
    }

    const handleMultiChoice = () => {
        setIsClicked(!isClicked);
        handleGenres(genre.id.toString());
    }
    const sessionStorageGenre = sessionStorage.getItem("userGenreIdPreference");
    const sessionStorageGenres = sessionStorage.getItem("userGenresIdPreference")?.split(",");

    let displayedContent: JSX.Element = <></>;
    if (typeOfChoice === 'single') {
        displayedContent = (< button
            className={`${sessionStorageGenre === genre.id.toString() ? 'genreButton Button--clicked' : 'genreButton Button--unclicked'}`}
            onClick={handleSingleChoice}>
            {genre.name}
        </button>)
    }
    if (typeOfChoice === 'multiple') {
        displayedContent = (< button
            className={`${sessionStorageGenres?.includes(genre.id.toString()) ? 'genreButton Button--clicked' : 'genreButton Button--unclicked'
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