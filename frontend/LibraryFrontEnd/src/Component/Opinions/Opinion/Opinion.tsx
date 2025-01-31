import { BookType, ReviewType } from "../../../constants/types";
import { useEffect, useState } from "react";
import "./Opinion.css";
import { OPINION_BY_BOOKID_URL } from "../../../constants/api";


type BookAndReviewType = {
    book: BookType,
    displayReview: (opinions: ReviewType[]) => void;
};

export const Opinion = ({book,displayReview}: BookAndReviewType) => {
    
    const FetchOpinionBYBookId = async (bookId: number) => {
        try {
            const response: Response = await fetch(
                OPINION_BY_BOOKID_URL + bookId
            );
            if (response.status === 200) {
                const responseData = await response.json();
                displayReview(responseData);
            } else if (response.status === 404) {
                console.log("404 response", response);
            }
        } catch (error) {
            console.error("error fetching Opinions:", error);
        }
    };

    useEffect(() => {
        FetchOpinionBYBookId(book.id);
    }, []);

    return (
        <>
        </>
    );
};
