import "./BookFooter.css";
import { BookType, ReviewType } from "../../../constants/types";
import { numberOfReviewsValidation } from '../../../constants/commonFunctions';
import { useContext } from 'react'
import { Opinion } from '../../Opinions/Opinion/Opinion';
import { ThemeContext } from '../../../App/App';

type BookFooterType = {
    bookFooter: {
        toggleCreateOpinion: (view: string) => void,
        handleOpinionList: (reviews: ReviewType[]) => void,
        handleAverageClick: () => void,
        averageClick: boolean,
    },
    updatedBook: BookType
}

export const BookFooter = ({ bookFooter, updatedBook }: BookFooterType) => {

    const theme = useContext(ThemeContext);
    const numberOfReview: number | undefined = updatedBook.opinions?.length;

    return (
        <>
            <footer className="bookcard__footer--flex">
                <section className="bookcard__footer-section--flex">
                    {!bookFooter.averageClick ? (
                        <div className="item_label bookcard__footer-reviews-container"
                            onClick={() => {
                                bookFooter.handleAverageClick();
                            }}
                            aria-label="Reviews">
                            <span className="bookcard__footer-numberOfReview">{numberOfReviewsValidation(numberOfReview)}</span>
                            <div className="bookcard__footer-average-rate--flex">
                                <a
                                    className="item_label bookcard__footer-average-rate"
                                >
                                    {updatedBook.averageRate}/5
                                </a>
                                <div className="rate_star bookcard__footer-ratestar"> &#9733;</div>
                            </div>
                        </div>
                    ) : (
                        <h4 className={`opinion__loading opinion__loading--${theme}`}>
                            Loading...
                        </h4>
                    )}
                </section>
                {bookFooter.averageClick && (
                    <Opinion
                        book={updatedBook}
                        displayReview={bookFooter.handleOpinionList}
                    />
                )}
                <button
                    className="button bookFooter__RateButton"
                    onClick={() => {
                        bookFooter.toggleCreateOpinion("createOpinion");
                    }}
                >
                    Rate this book
                </button>
            </footer>

        </>
    )
}


