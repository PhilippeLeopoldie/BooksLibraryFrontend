import "./BookCard.css";
import { BookZoomCover } from "./BookCover/BookZoomCover/BookZoomCover";
import { BookCover } from "./BookCover/BookCover";
import { BookBody } from "./BookBody/BookBody";
import { BookType, ReviewType } from "../../constants/types";
import { OpinionCreate } from "../Opinions/OpinionCreate/OpinionCreate";
import { OpinionList } from "../Opinions/OpinionList/OpinionList";
import { ThemeContext } from "../../App/App";
import { BOOK_BY_BOOKID_URL } from "../../constants/api";
import { useContext, useEffect, useState } from "react";
import { BookFooter } from "./BookFooter/BookFooter";

type CardState = {
  updatedBook: BookType,
  curentView: string, 
  opinionCreated: boolean,
  averageRateClick: boolean,
  reviewList: ReviewType[],
}

export const BookCard = ({ book }: { book: BookType }) => {
  const theme = useContext(ThemeContext);
  const [card, setCard] = useState <CardState>({
    updatedBook : book  ,
    curentView : "bookPresentation",
    opinionCreated: false,
    averageRateClick: false,
    reviewList:[],
  });

  const handleAverageRateClick = () => {
    setCard(prevBookCard => ({...prevBookCard, averageRateClick: !card.averageRateClick}));
  }


  // used in handleOpinionList to render <OpinionList/> when 'curentView'=== 'opinionList'
  const toggleOpinionList = () => {
    card.curentView === "bookPresentation"
      ? setCard(prevView => ({...prevView,curentView:"opinionList"}))
      : setCard(prevView => ({...prevView, curentView:"bookPresentation"}));
    setCard(prevAverageClick => ({...prevAverageClick, averageRateClick: false}));
  };

  const handleOpinionList = (reviews: ReviewType[]) => {
    toggleOpinionList();
    setCard(prevBookCard => ({...prevBookCard, reviewList: reviews}));
  };

  const handleCreatedOpinion = (value: boolean) => {
    setCard(prevOpinionCreatedValue => ({...prevOpinionCreatedValue, opinionCreated:value}));
  };
  const toggleCreateOpinion = (view: string) => {
    setCard(prevView => ({...prevView, curentView: view}))
  };

  const fetchBook = async () => {
    try {
      const bookResponse: Response = await fetch(
        `${BOOK_BY_BOOKID_URL}${book?.id}`
      );
        if (bookResponse.status === 200) {
            const bookResponseData = await bookResponse.json();
          setCard(prevState => ({ ...prevState, updatedBook: bookResponseData.book, opinionCreated: false }));
      } else if (bookResponse.status === 404) {
        console.log(bookResponse);
      }
    } catch (error) {
      console.error(`Error fetching bookId:${book?.id}`, error);
    }
  };
  // when a new opinion is posted ,fetch the book with the new averageRate updated
  useEffect(() => {
      card.opinionCreated === true && fetchBook();
  }, [card.opinionCreated]);

  //when 'displayContent' is rendered it will render either <OpinionList/> , <bookPresentation/> or <createOpinion/>
  let displayedContent: JSX.Element = <></>;
  if (book && card.curentView === "bookPresentation") {
    const bookFooter = {
      toggleCreateOpinion: toggleCreateOpinion,
      handleOpinionList : handleOpinionList,
      handleAverageClick: handleAverageRateClick,
      averageClick: card.averageRateClick,
    }
    displayedContent = (
      <section className={"bookcard--grid bookcard--" + theme}>
        <BookCover book={book} />
        <BookBody  book = {book} />
        <BookFooter bookFooter={bookFooter} updatedBook={card.updatedBook}/>
        
      </section>
    );
  }
  if (card.curentView === "opinionList") {
    displayedContent = (
      <OpinionList
        opinions={card.reviewList}
        displayReviews={() => toggleOpinionList()}
        book={book}
      />
    );
  }
  if (card.curentView === "createOpinion") {
    displayedContent = (
      <OpinionCreate
        book={book && book}
        toCreate={toggleCreateOpinion}
        created={handleCreatedOpinion}
      />
    );
  }

  return <>{displayedContent}</>;
};
