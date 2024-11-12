import { useContext, useState } from "react";
import "./BookCreate.css";
import { Link } from "react-router-dom";
import { BOOK_URL } from "../../Url";
import { ThemeContext } from "../App/App";

type FormDataType = {
    title: string;
    author: string;
    imageUrl: string;
};

export const BookCreate = () => {
    const theme = useContext(ThemeContext);
    const [formData, setFormData] = useState<FormDataType>({
        title: "",
        author: "",
        imageUrl: "",
    });

    const [bookCreatedMessage, setBookCreatedMessage] = useState<boolean>(false);
    const [errorBook, setErrorBook] = useState<Boolean>(false);
    const [errorBookDetail, setErrorBookDetail] = useState<string>("");
    const rootElement = document.documentElement;

    const PostBook = async () => {
        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title: formData.title,
                author: formData.author,
                imageUrl: formData.imageUrl,
            }),
        };
        const bookResponse: Response = await fetch(
            BOOK_URL,
            requestOptions
        );
        if (bookResponse.status === 201) {
            setErrorBook(false);
            const body = await bookResponse.json();
            setBookCreatedMessage(true);
            setFormData({
                title: "",
                author: "",
                imageUrl: "",
            });
            return body;
        } else if (bookResponse.status === 400) {
            setErrorBook(true);
            const errorData = await bookResponse.json();
            setErrorBookDetail(errorData.detail);
        }
    };
    const HideBookCreatedMessage = () => {
        setBookCreatedMessage(false);
    };

    const HideErrorDetail = () => {
        setErrorBook(false);
    };

    const HandleInputChange = (
        e:
            | React.ChangeEvent<HTMLInputElement>
            | React.ChangeEvent<HTMLTextAreaElement>
    ) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        bookCreatedMessage && HideBookCreatedMessage();
        errorBook && HideErrorDetail();
    };

    return (
        <>
            <section
                className={`book-create-form__container--${theme} book-create-form__container`}
            >
                <script>
                    {theme === "black"
                        ? (rootElement.style.backgroundColor = "#000000")
                        : (rootElement.style.backgroundColor = "#f3f3f4")}
                </script>
                <form
                    onSubmit={(e) => e.preventDefault()}
                    action={BOOK_URL}
                    method="POST"
                    className="book-create-form"
                >
                    <input
                        className={`input input--${theme}`}
                        placeholder="Title"
                        name="title"
                        value={formData.title}
                        onChange={(e) => HandleInputChange(e)}
                    />

                    <input
                        className={`input input--${theme}`}
                        placeholder="Author"
                        name="author"
                        value={formData.author}
                        onChange={(e) => HandleInputChange(e)}
                    />

                    <input
                        className={`input input--${theme} input__imageUrl--${theme}`}
                        placeholder="Paste Book Image Link"
                        name="imageUrl"
                        value={formData.imageUrl}
                        onChange={(e) => HandleInputChange(e)}
                    />
                    <section className="book-create-form__output-card">
                        {errorBook && (
                            <div className="validation__error-message">{errorBookDetail}</div>
                        )}
                        {bookCreatedMessage && (
                            <div className="book-create-form__output-card">
                                <div className="book-create-form__output">Book created!</div>
                                <Link to="/">
                                    <h3 className={`book-create-form__output--back-to-home--${theme}`}>
                                        back to Home
                                    </h3>
                                </Link>
                            </div>
                        )}
                    </section>
                    <footer className="footer--flex">
                        <button
                            className="button book-create-form__cancel-button"
                            onClick={() => {
                                setErrorBook(false);
                                setFormData({
                                    title: "",
                                    author: "",
                                    imageUrl: "",
                                });
                            }}
                        >
                            Cancel
                        </button>
                        <button
                            className="button book-create-form__post-button"
                            onClick={async () => {
                                await PostBook();
                            }}
                        >
                            Create book
                        </button>
                    </footer>
                </form>
            </section>
        </>
    );
};
