import "./BookCover.css";
import { BookType } from "../../../constants/types";
import { useState } from "react";

export const BookCover = ({ book }: { book:BookType }) => {

    const [imageZoom, setImageZoom] = useState<string>("zoomOut");
    const toggleZoomImage = () => {
        imageZoom === "zoomOut" ? setImageZoom("zoomIn") : setImageZoom("zoomOut");
    };

    return (
        <>
            <img
                src={book.imageUrl && `${book.imageUrl}`}
                className={`boocard__Image-${imageZoom} boocard__Image`}
                alt="bookImage"
                onClick={toggleZoomImage}
            />
        </>
    );
};
