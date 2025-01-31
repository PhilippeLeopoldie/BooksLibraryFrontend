import "./BookBody.css";
import { BookType } from "../../../constants/types";
type BookTitleAuthor = {
    title: string;
    author: string;
}

export const BookBody = ({ book }: { book: BookType }) => {
    return (
        <section className="bookcard__body">
            <h3 title="Book Title" className="booktitle">
                {book.title.length > 40
                    ? `${book.title.slice(0, 40)}...`
                    : book.title}
            </h3>
            <h3 className="bookauthor">by: {book.author}</h3>
        </section>
    )
};
