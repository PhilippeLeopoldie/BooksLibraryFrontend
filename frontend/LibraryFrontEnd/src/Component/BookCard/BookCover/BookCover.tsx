import "./BookCover.css";
import { BookType } from "../../../constants/types";
import Flip from "../../../media/flip.svg";
import { ThemeContext } from "../../../App/App";
import { useContext,useState } from "react";

type CurentView = 'bookCover' | 'description';

export const BookCover = ({ book }: { book:BookType }) => {
    const theme = useContext(ThemeContext);
    const [currentView, setCurrentView] = useState<CurentView>('bookCover');
    const toggleDescription = () => {
        setCurrentView(currentView === 'bookCover' ? 'description' : 'bookCover');
    }

    return (
        <>
            {currentView === 'bookCover' ? (
                <img
                    src={book.imageUrl && `${book.imageUrl}`}
                    className={`bookcard__Image`}
                    alt="bookImage"
                    onClick={toggleDescription}
                />
            ) : (
                <div
                    className="bookcard__Description"
                    
                    >
                        <div className="bookcard__Description bookcard__DescriptionHearder">
                            <img
                                className={`bookcard__Description flipImage`}
                                src={Flip}
                                onClick={toggleDescription}
                                alt="Back"
                            />
                            <h2 className={`bookcard__DescriptionTitle--${theme}`}>Description</h2>
                        </div>
                        <p className={`bookcard__Description bookcard__Description--${theme}`}>{book.description || "No description available"}</p>
                    </div>
                )}
        </>
    );
};
