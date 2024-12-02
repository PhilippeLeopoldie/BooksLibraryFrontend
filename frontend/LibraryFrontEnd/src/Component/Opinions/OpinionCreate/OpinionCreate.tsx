import React, { useContext, useState } from "react";
import { OPINION_URL } from "../../../constants/api";
import { RateClick } from "../../Rates/RateClick/RateClick";
import "./OpinionCreate.css";
import { ThemeContext } from "../../App/App";

type AddOpinionType = {
    book?: {
        id: number;
        title: string;
        author: string;
    };
    toCreate: (value: string) => void;
    created: (value: boolean) => void;
};

type FormDataType = {
    view: string;
    userName: string;
    rate: number;
};

export const OpinionCreate = ({ book, toCreate, created }: AddOpinionType) => {
    const theme = useContext(ThemeContext);
    const [bookCreatedMessage, setBookCreatedMessage] = useState<boolean>(false);
    const [errorOpinion, setErrorOpinion] = useState<boolean>(false);
    const [errorOpinionDetail, setErrorOpinionDetail] = useState<string>("");
    const [rateText, setRateText] = useState<string>("");
    const [formData, setFormData] = useState<FormDataType>({
        view: "",
        userName: "",
        rate: 0,
    });

    const RateTextConvertor = (rate: number) => {
        let rateText = "";
        switch (rate) {
            case 1:
                rateText = "Very bad";
                break;
            case 2:
                rateText = "Bad";
                break;
            case 3:
                rateText = "Good";
                break;
            case 4:
                rateText = "Very Good";
                break;
            case 5:
                rateText = "Excellent";
                break;
        }
        setRateText(rateText);
    };

    const HandleFormDataRate = (newRate: number) => {
        setFormData({ ...formData, rate: newRate });
        RateTextConvertor(newRate);
    };

    const PostOpinion = async (bookId: number) => {
        console.log("bookid", bookId);
        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                bookId,
                rate: formData.rate,
                view: formData.view,
                userName: formData.userName,
            }),
        };
        const opinionResponse: Response = await fetch(OPINION_URL, requestOptions);
        if (opinionResponse.status === 201) {
            const newOpinion = await opinionResponse.json();
            setBookCreatedMessage(true);
            setErrorOpinion(false);
            toCreate('bookPresentation');
            created(true);
            return newOpinion;
        } else if (opinionResponse.status === 400) {
            const errorData = await opinionResponse.json();
            setBookCreatedMessage(false);
            setErrorOpinion(true);
            setErrorOpinionDetail(errorData.detail);
        }
    };

    const HideBookCreatedMessage = () => {
        setBookCreatedMessage(false);
    };
    const HideErrorDetail = () => {
        setErrorOpinion(false);
    };
    const HandleInputChange = (
        e:
            | React.ChangeEvent<HTMLInputElement>
            | React.ChangeEvent<HTMLTextAreaElement>
    ) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        bookCreatedMessage && HideBookCreatedMessage();
        errorOpinion && HideErrorDetail();
    };

    return (
        <>
            <section
                className={`opinionCreate--${theme} opinionCreateCard--${theme}--grid opinionCreateCard--grid`}
            >
                <header className={`opinionCreate--${theme} opinionCreate__header`}>
                    <h2 className={`opinionCreate--${theme} opinionCreate__booktitle`}>
                        {book?.title}
                    </h2>
                    <h3 className={`opinionCreate--${theme} opinionCreate__bookauthor`}>
                        by: {book?.author}
                    </h3>
                </header>
                <main className={`opinionCreate--${theme} opinionCreate__main--grid`}>
                    <section className={`opinionCreate--${theme} opinionCreate__rate`}>
                        <RateClick rate={formData.rate} HandleRate={HandleFormDataRate} />
                        <div className={`opinionCreate--${theme} opinionCreate__rateText`}>
                            {rateText}
                        </div>
                    </section>
                    <section
                        className={`opinionCreate--${theme} opinionCreate__inputs--grid`}
                    >
                        <textarea
                            title="View"
                            className="opinionCreate__view"
                            placeholder="View"
                            name="view"
                            value={formData.view}
                            onChange={(e) => HandleInputChange(e)}
                        />
                        <input
                            className="opinionCreate__input"
                            placeholder="UserName"
                            name="userName"
                            value={formData.userName}
                            onChange={(e) => HandleInputChange(e)}
                        />
                        <section className={`opinionCreate--${theme} OpinionCreate_errorMessage`}>
                            {errorOpinion && (
                                <div
                                    className={`opinionCreate--${theme} validation__errorMessage`}
                                >
                                    {errorOpinionDetail}
                                </div>
                            )}
                        </section>
                    </section>
                </main>
                <footer className={`opinionCreate--${theme} opinionCreate__footer--flex`}>
                    <button
                        className="button opinionCreate__cancelButon"
                        onClick={() => {
                            toCreate('bookPresentation');
                        }}
                    >
                        Cancel
                    </button>
                    <button
                        className="button opinionCreate__postButton"
                        onClick={async () => {
                            book && book.id && (await PostOpinion(book.id));
                        }}
                    >
                        Post
                    </button>
                </footer>
            </section>
        </>
    );
};
