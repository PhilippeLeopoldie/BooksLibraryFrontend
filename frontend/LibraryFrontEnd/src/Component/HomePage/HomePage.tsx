import "./HomePage.css";
import { GenreFilter } from "./GenreFilter/GenreFilter";
import { NewBooks } from "./NewBooks/NewBooks";
import { TopBook } from "./TopBooks/TopBook";
import { useContext, useState } from "react";
import { ThemeContext } from "../../App/App";

export const HomePage = () => {
    const theme = useContext(ThemeContext);
    const [numberOfBooks, setNumberOfBooks] = useState<number>(3);
    
    

    return (
        <>
            <div className={`BookList--${theme}--flex`}>
                <GenreFilter/>
                <TopBook maxNumBooks={`${numberOfBooks}`} />
                <NewBooks/>
            </div>
        </>
    );
};
