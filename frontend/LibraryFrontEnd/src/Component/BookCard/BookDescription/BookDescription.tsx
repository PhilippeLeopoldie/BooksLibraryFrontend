import "./BookDescription.css";
import { BookType } from "../../../constants/types";
import { useContext} from "react";
import Flip from "../../../media/flip.svg";
import { ThemeContext } from "../../../App/App";

type HandleBookDescription =
    {
        book: BookType;
        toggleDescription: () => void;
    }

export const BookDescription = ({ HandleBookDescription }: { HandleBookDescription: HandleBookDescription }) => {
    const theme = useContext(ThemeContext);
    return (
        <>
            <div className="bookcard__DescriptionContainer">
                <div className="bookcard__DescriptionHearder">
                    <img
                        className={`bookcard__DescriptionFlipImage`}
                        src={Flip}
                        onClick={HandleBookDescription.toggleDescription}
                        alt="Back"
                    />
                    <h2 className={`bookcard__DescriptionTitle bookcard__DescriptionTitle--${theme}`}>Description</h2>
                </div>
                <p className={`bookcard__Description bookcard__Description--${theme}`}>{HandleBookDescription.book.description || "No description available"}</p>
            </div>
        </>
    );
};