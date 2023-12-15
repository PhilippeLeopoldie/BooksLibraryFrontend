import { BookSearch } from "./BookSearch";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { useState } from "react";

jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useState: jest.fn(),
}));

type BooksSearchCriteria = {
  search?:{
    title: string,
    author: string
  }
}

const book : BooksSearchCriteria = {
  search:{
    title: "",
    author: ""
  }
}

describe("BookList rendering", () => {
  test("snapShot: should render BookList", () => {
    // Arrange + Act
    (useState as jest.Mock).mockImplementation(() => [book, jest.fn()]);
    (useState as jest.Mock).mockImplementation(() => ["author", jest.fn()]);
    const {asFragment} = render(<BookSearch/>)

    // Expect
    expect(asFragment()).toMatchSnapshot();
  })

  test("snapShot: should render an empty BookList", () => {
    // Arrange + Act
    (useState as jest.Mock).mockImplementation(() => [book, jest.fn()]);
    (useState as jest.Mock).mockImplementation(() => ["author", jest.fn()]);
    const {asFragment} = render(<BookSearch/>)

    // Expect
    expect(asFragment()).toMatchSnapshot();
  })
})