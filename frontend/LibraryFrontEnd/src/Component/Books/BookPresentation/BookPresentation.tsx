import "./BookPresentation.css";
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

export const BookPresentation = ({ book }: BookType) => {
  
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
      <header className="bookcard__header">
        <h3 title="Book Title" className="booktitle">
          {book.title.length > 40
            ? `${book.title.slice(0, 40)}...`
            : book.title}
        </h3>
        <h3 className="bookauthor">by: {book.author}</h3>
      </header>
    </>
  );
};
