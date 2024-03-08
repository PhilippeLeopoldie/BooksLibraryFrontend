import "./Book.css";
import { BookZoomImage } from "../BookZoomImage/BookZoomImage";
import { BookPresentation } from "../BookPresentation/BookPresentation";
import { OpinionCreate } from "../../Opinions/OpinionCreate/OpinionCreate";
import { OpinionList } from "../../Opinions/OpinionList/OpinionList";
import { ThemeContext } from "../../App/App";
import { BOOK_BY_BOOKID_URL } from "../../../Url";
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

export const Book = ({ book }: BookType) => {
  const theme = useContext(ThemeContext);
  const [updatedBook, setUpdatedBook] = useState<BookType>({ book });

  // store the card name that will be displayed 
  const [curentView, setCurentView] = useState<string>("bookPresentation");

  //state the creation of a new opinion
  const [opinionCreated, setOpinionCreated] = useState<boolean>(false);

  // state if average rate has been clicked on 
  const [averageClick, setAverageclick] = useState<boolean>(false);
  const handleAverageClick = () => {
    setAverageclick(!averageClick);
  }

  // store the list of reviews for a book
  const [reviewList, setReviewList] = useState<Reviews[]>();

  const [imageZoom, setImageZoom] = useState<string>("zoomOut");

  const fetchBook = async () => {
    try {
      const bookResponse: Response = await fetch(
        `${BOOK_BY_BOOKID_URL}${book?.id}`
      );
      if (bookResponse.status === 200) {
        const bookResponseData = await bookResponse.json();
        setUpdatedBook(bookResponseData);
      } else if (bookResponse.status === 404) {
        console.log(bookResponse);
      }
    } catch (error) {
      console.error(`Error fetching bookId:${book?.id}`, error);
    }
  };

  // when a new opinion is posted ,fetch the book with the new averageRate updated from the backend
  useEffect(() => {
    opinionCreated === true && fetchBook();
    console.log(`opinionCreated has changed its value is : ${opinionCreated}`);
  }, [opinionCreated]);

  const toggleZoomImage = () => {
    imageZoom === "zoomOut" ? setImageZoom("zoomIn") : setImageZoom("zoomOut");
  };

  // used in handleOpinionList to render <OpinionList/> when 'curentView'=== 'opinionList'
  const toggleOpinionList = () => {
    curentView === "bookPresentation"
      ? setCurentView("opinionList")
      : setCurentView("bookPresentation");
    setAverageclick(false);
  };
  const handleOpinionList = (reviews: Reviews[]) => {
    toggleOpinionList();
    setReviewList(reviews);
  };

  // used in handleCreateOpinion to render <CreateOpinion/> when 'curentView'=== 'CreateOpinion'
  const toggleCreateOpinion = (view: string) => {
    curentView === "bookPresentation"
      ? setCurentView(view)
      : setCurentView(view);
  };
  const handleCreatedOpinion = (value: boolean) => {
    setOpinionCreated(value);
  };

  //when 'displayContent' is rendered it will render either <OpinionList/> , <bookPresentation/> or <createOpinion/>
  let displayedContent: JSX.Element = <></>;
  if (curentView === "opinionList") {
    displayedContent = (
      <OpinionList
        opinions={reviewList}
        displayReviews={() => toggleOpinionList()}
        book={book}
      />
    );
  }
  if (book && curentView === "bookPresentation") {
    const bookFooter = {
      toggleCreateOpinion: toggleCreateOpinion,
      handleOpinionList : handleOpinionList,
      handleAverageClick: handleAverageClick,
      averageClick: averageClick,
    }
    displayedContent = (
      <div className={"bookcard--grid bookcard--" + theme}>
        <BookPresentation book={book} />
        <BookFooter bookFooter={bookFooter} updatedBook={updatedBook.book}/>
        
      </div>
    );
  }
  if (curentView === "createOpinion") {
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
