import { useEffect, useState, useContext } from "react";
import "./Opinion.css";
import { OpinionList } from "../OpinionList/OpinionList";
import {OPINION_BY_BOOKID_URL} from "../../../Url";
import modify from "../../media/write.svg";
import { Rate } from "../../Rates/Rate/Rate";
import { ThemeContext } from "../../App/App";

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
    imageUrl?:string;
    averageRate?: number;
  };
  onEdit?: (opinionToUpdate: OpinionType) => void;
  // toCreate: () => void;
  displayReview: (opinions: OpinionType[]) => void;
};

export const Opinion = ({
  book,
  onEdit,
  displayReview,
}: BookType) => {
  const theme = useContext(ThemeContext);
  const [fetching, setFething] = useState<boolean>(true);
  const [lastOpinion, setLastOpinion] = useState<OpinionType | null>(null);
  const FetchOpinionBYBookId = async (bookId: number) => {
    try {
      const response: Response = await fetch(
        OPINION_BY_BOOKID_URL + bookId
      );
      if (response.status === 200) {
        const responseData = await response.json();
        displayReview(responseData);
        setFething(false);
      } else if (response.status === 404) {
        setFething(false);
        console.log("404 response", response);
      }
    } catch (error) {
      console.error("error fetching Opinions:", error);
    }
  };


  useEffect(() => {
    FetchOpinionBYBookId(book.id);
  }, []);
/* 
  if (fetching) {
    return <h4 className={`opinion__loading opinion__loading--${theme}`}>Loading...</h4>;
  } */

  return (
    <>
    </>
  );
};
