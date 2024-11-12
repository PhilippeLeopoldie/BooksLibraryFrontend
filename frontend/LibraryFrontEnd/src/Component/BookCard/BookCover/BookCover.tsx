import "./BookCover.css";
import { useState } from "react";

type BookType = {
    book: {
        id: number;
        title: string;
        author: string;
        averageRate: number;
        imageUrl?: string;
    };
};

export const BookCover = ({ book }: BookType) => {

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
