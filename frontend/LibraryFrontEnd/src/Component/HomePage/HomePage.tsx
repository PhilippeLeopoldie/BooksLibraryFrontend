import "./HomePage.css";
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
                <TopBook maxNumBooks={`${numberOfBooks}`} />
                <NewBooks/>
            </div>
        </>
    );
};
