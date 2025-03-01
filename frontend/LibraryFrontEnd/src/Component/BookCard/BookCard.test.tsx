import { render, screen } from "@testing-library/react";
import { BookCard } from "./BookCard";
import "@testing-library/jest-dom";

const actualBookData = {
  id: 1,
  title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    description: "The story of the mysteriously wealthy Jay Gatsby and his love for the beautiful Daisy Buchanan.",
  averageRate: 3,
};

describe("", () => {
  test("snapchot: renders book title and author", () => {
    // Arrange and Act
    const { asFragment } = render(
      <BookCard book={actualBookData}  />
    );

    //expect (snapshot)
    expect(asFragment()).toMatchSnapshot();
  });

  test("renders book title and author", () => {
    // Arrange
    render(<BookCard book={actualBookData}  />);

    // Act
    const titleElement = screen.getByText("The Great Gatsby");
    const authorElement = screen.getByText("by: F. Scott Fitzgerald");

    // Expect
    expect(titleElement).toBeInTheDocument();
    expect(authorElement).toBeInTheDocument();
    expect(titleElement).toHaveClass("booktitle");
    expect(authorElement).toHaveClass("bookauthor");
  });

/*   test("renders delete img with the correct alt text and ClassName", () => {
    // Arrange
    const onDelete = jest.fn();
    const { getByAltText } = render(
      <Book book={actualBookData} onDelete={onDelete} />
    );

    // Act
    const trashImage = getByAltText("delete");

    //Expect
    expect(trashImage).toBeInTheDocument();
    expect(trashImage).toHaveClass("bookcard--iconeTrash");
  }); */
});
