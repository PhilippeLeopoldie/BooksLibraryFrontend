import "./BookCard.css";
import { BookZoomCover } from "./BookCover/BookZoomCover/BookZoomCover";
import { BookCover } from "./BookCover/BookCover";
import { BookBody } from "./BookBody/BookBody";
import { OpinionCreate } from "../Opinions/OpinionCreate/OpinionCreate";
import { OpinionList } from "../Opinions/OpinionList/OpinionList";
import { ThemeContext } from "../App/App";
import { BOOK_BY_BOOKID_URL } from "../../Url";
import { useContext, useEffect, useState } from "react";
import { BookFooter } from "./BookFooter/BookFooter";

type BookType = {
  book: {
    id: number;
    title: string;
    author: string;
    averageRate: number;
    imageUrl?: string;
  };
};

type Reviews = {
  id: number;
  rate: number;
  view: string;
  userName: string;
  postDate: string;
  bookId: number;
};

type BookState = {
  updatedBook: BookType,
  curentView: string, 
  opinionCreated: boolean,
  averageClick: boolean,
  reviewList: Reviews[],
}

export const BookCard = ({ book }: BookType) => {
  const theme = useContext(ThemeContext);
  const [bookCard, setBookCard] = useState <BookState>({
    updatedBook : {book}  ,
    curentView : "bookPresentation",
    opinionCreated: false,
    averageClick: false,
    reviewList:[],
  });

  const handleAverageClick = () => {
    setBookCard(prevBookCard => ({...prevBookCard, bookCard, averageClick: !bookCard.averageClick}));
  }


  // used in handleOpinionList to render <OpinionList/> when 'curentView'=== 'opinionList'
  const toggleOpinionList = () => {
    bookCard.curentView === "bookPresentation"
      ? setBookCard(prevView => ({...prevView, curentView:"opinionList"}))
      : setBookCard(prevView => ({...prevView, curentView:"bookPresentation"}));
    setBookCard(prevAverageClick => ({...prevAverageClick, averageClick: false}));
  };

  const handleOpinionList = (reviews: Reviews[]) => {
    toggleOpinionList();
    setBookCard(prevBookCard => ({...prevBookCard, reviewList: reviews}));
  };

  const handleCreatedOpinion = (value: boolean) => {
    setBookCard(prevOpinionCreatedValue => ({...prevOpinionCreatedValue, opinionCreated:value}));
  };
  const toggleCreateOpinion = (view: string) => {
    setBookCard(prevView => ({...prevView, curentView: view}))
  };

  const fetchBook = async () => {
    try {
      const bookResponse: Response = await fetch(
        `${BOOK_BY_BOOKID_URL}${book?.id}`
      );
      if (bookResponse.status === 200) {
        const bookResponseData = await bookResponse.json();
        setBookCard(prevState => ({...prevState, updatedBook: bookResponseData,}));
      } else if (bookResponse.status === 404) {
        console.log(bookResponse);
      }
    } catch (error) {
      console.error(`Error fetching bookId:${book?.id}`, error);
    }
  };
  // when a new opinion is posted ,fetch the book with the new averageRate updated
  useEffect(() => {
    bookCard.opinionCreated === true && fetchBook();
    setBookCard((prevState) => ({...prevState, opinionCreated: false,}));
  }, [bookCard.opinionCreated]);

  //when 'displayContent' is rendered it will render either <OpinionList/> , <bookPresentation/> or <createOpinion/>
  let displayedContent: JSX.Element = <></>;
  if (book && bookCard.curentView === "bookPresentation") {
    const bookFooter = {
      toggleCreateOpinion: toggleCreateOpinion,
      handleOpinionList : handleOpinionList,
      handleAverageClick: handleAverageClick,
      averageClick: bookCard.averageClick,
    }
    displayedContent = (
      <div className={"bookcard--grid bookcard--" + theme}>
        <BookCover book={book} />
        <BookBody  title = {book.title } author = {book.author}/>
        <BookFooter bookFooter={bookFooter} updatedBook={bookCard.updatedBook.book}/>
        
      </div>
    );
  }
  if (bookCard.curentView === "opinionList") {
    displayedContent = (
      <OpinionList
        opinions={bookCard.reviewList}
        displayReviews={() => toggleOpinionList()}
        book={book}
      />
    );
  }
  if (bookCard.curentView === "createOpinion") {
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
