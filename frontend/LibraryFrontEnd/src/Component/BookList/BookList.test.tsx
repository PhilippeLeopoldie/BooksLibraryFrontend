import { BookList } from "./BookList";
import { act, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

global.fetch = jest.fn().mockImplementation(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve([
        { book: { id: 1, title: "Book 1", author: "Author 1" } },
      ]),
    status: 200,
    hearders: new Headers(),
  })
);

test("Should render Loading message initially", async () => {
  //Arrange
 await act( async () => {
  render(<BookList />);
 }) 

  //Act
  const loadingMessage = screen.getByText("Loading...");

  //Expect
  expect(loadingMessage).toBeInTheDocument();
});
