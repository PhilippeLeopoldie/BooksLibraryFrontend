import "./BookCover.css";
import { BookType } from "../../../constants/types";
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
                    onClick={toggleDescription}
                    >
                        <h2 className={`bookcard__DescriptionTitle--${theme}` }>Description</h2>
                        <p className={`bookcard__Description bookcard__Description--${theme}`}>{book.description || "No description available"}</p>
                    </div>
                )}
        </>
    );
};
