import "./BookCover.css";
import { BookDescription } from "../BookDescription/BookDescription";
import { BookType } from "../../../constants/types";
import { ThemeContext } from "../../../App/App";
import { useContext,useState } from "react";

type CurentView = 'bookCover' | 'description';

type HandleBookDescription =
    {
        book: BookType;
        toggleDescription: () => void;
    }

export const BookCover = ({ book }: { book: BookType }) => {
    const theme = useContext(ThemeContext);
    const [currentView, setCurrentView] = useState<CurentView>('bookCover');
    const toggleDescription = () => {
        setCurrentView(currentView === 'bookCover' ? 'description' : 'bookCover');
    }
    const handleBookDescription: HandleBookDescription = { book, toggleDescription };
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
                <BookDescription HandleBookDescription={handleBookDescription} />
            )}
        </>
    );
};
