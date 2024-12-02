import { useEffect, useState } from "react";
import "./Opinion.css";
import { OPINION_BY_BOOKID_URL } from "../../../constants/api";


type OpinionType = {
    id: number;
    rate: number;
    view: string;
    userName: string;
    postDate: string;
    bookId: number;
};

type BookType = {
    book: {
        id: number;
        title: string;
        author: string;
        imageUrl?: string;
        averageRate?: number;
    };
    displayReview: (opinions: OpinionType[]) => void;
};

export const Opinion = ({book,displayReview}: BookType) => {
    
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
