import { BookList } from "./BookList";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { useState } from "react";


jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useState: jest.fn(),
}));
describe("BookList 'Loading...'message checking", () => {
  test("renders 'Loading...' when books state is null", () => {
    // arange
    (useState as jest.Mock).mockImplementation(() => [null, jest.fn()]);

    // Act
    render(<BookList />);
    const loadingMessage = screen.getByText("Loading...");

    // expect
    expect(loadingMessage).toBeInTheDocument();
  });

  test("should not render 'Loading...' when books state is not null", () => {
    // arrange
    type BookType = {
      book: {
        id: number;
        title: string;
        author: string;
      };
    };
    const book: BookType = {
      book: {
        id: 1,
        title: "title 1",
        author: "author 1",
      },
    };
    (useState as jest.Mock).mockImplementation(() => [book, jest.fn()]);

    // Act
    render(<BookList />);
    const loadingMessage = screen.queryByText("Loading...");

    // expect
    expect(loadingMessage).toBeNull();
  });
});
