import { BookList } from "./BookList";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { useState } from "react";


jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useState: jest.fn(),
}));

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
describe("BookList rendering", () => {
  test("snapShot: should render BookList", () => {
    (useState as jest.Mock).mockImplementation(() => [book, jest.fn()]);
    const {asFragment} = render(<BookList/>)

    expect(asFragment()).toMatchSnapshot();
  })

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
   
    (useState as jest.Mock).mockImplementation(() => [book, jest.fn()]);

    // Act
    render(<BookList />);
    const loadingMessage = screen.queryByText("Loading...");

    // expect
    expect(loadingMessage).toBeNull();
  });
});
