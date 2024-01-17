import {render, screen,} from "@testing-library/react";
import { BookListSearch } from "./BookListSearch";
import "@testing-library/jest-dom";
import { useState } from "react";

jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useState: jest.fn(),
}));

type BooksType = {
  book: {
    id: number;
    title: string;
    author: string;
    averageRate: number;
  };
};

const book : BooksType = {
  book:{
    id: 1,
    title: "title",
    author: "author",
    averageRate: 3,
  }

}

describe("BookListSearch", () => {
  test("snapShot: render Loading... while fetching", ()=> {
    (useState as jest.Mock).mockImplementation(() => [book, jest.fn()]);
    (useState as jest.Mock).mockImplementation(() => ["Loading...", jest.fn()]);

    const {asFragment} = render(<BookListSearch titleOrAuthor={"title"}/>)

    expect(asFragment()).toMatchSnapshot();
  })

  test("snapShot: should not render Loading... when not fetching", ()=> {
    (useState as jest.Mock).mockImplementation(() => [[], jest.fn()]);
    (useState as jest.Mock).mockImplementation(() => ["Loading...", jest.fn()]);

    const {asFragment} = render(<BookListSearch titleOrAuthor={""}/>)

    expect(asFragment()).toMatchSnapshot();
  })

  test("snapShot: render (0) book found", ()=> {
    (useState as jest.Mock).mockImplementation(() => [[], jest.fn()]);
    (useState as jest.Mock).mockImplementation(() => ["", jest.fn()]);

    const {asFragment} = render(<BookListSearch titleOrAuthor={"z"}/>)

    expect(asFragment()).toMatchSnapshot();
  })

  test("snapShot: render (1) book found", ()=> {
    (useState as jest.Mock).mockImplementation(() => [book, jest.fn()]);
    (useState as jest.Mock).mockImplementation(() => ["", jest.fn()]);

    const {asFragment} = render(<BookListSearch titleOrAuthor={"chat"}/>)

    expect(asFragment()).toMatchSnapshot();
  })

  
})