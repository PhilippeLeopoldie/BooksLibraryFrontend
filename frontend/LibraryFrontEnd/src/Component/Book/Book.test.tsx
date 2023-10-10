import {render, screen,} from "@testing-library/react";
import { Book } from "./Book";
import "@testing-library/jest-dom";

const actualBookData = {
  id: 1,
  title: "The Great Gatsby",
  author: "F. Scott Fitzgerald",
};

test("renders book title and author", () => {
  // Arrange
  render(<Book book={actualBookData} onDelete={() => {}} />);

  // Act
  const titleElement = screen.getByText("The Great Gatsby");
  const authorElement = screen.getByText("by: F. Scott Fitzgerald");

  // Assert
  expect(titleElement).toBeInTheDocument();
  expect(authorElement).toBeInTheDocument();
  expect(titleElement).toHaveClass("booktitle");
  expect(authorElement).toHaveClass("bookauthor");
});

test("renders delete img with the correct alt text and ClassName", () => {
  // Arrange
  const onDelete = jest.fn();
  const { getByAltText } = render(
    <Book book={actualBookData} onDelete={onDelete} />
  );

  // Act
  const trashImage = getByAltText("delete");

  //Assert
  expect(trashImage).toBeInTheDocument();
  expect(trashImage).toHaveClass("bookcard--iconeTrash");
});
