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
  };
};

const book : BooksType = {
  book:{
    id: 1,
    title: "title",
    author: "author",
  }

}

describe("BookListSearch", () => {
  test("snapShot: render BookListSearch", ()=> {
    (useState as jest.Mock).mockImplementation(() => [book, jest.fn()]);
    (useState as jest.Mock).mockImplementation(() => [book, jest.fn()]);

    const {asFragment} = render(<BookListSearch titleOrAuthor={""}/>)

    expect(asFragment()).toMatchSnapshot();
  })

  test("snapShot: render 'Loading...'", ()=> {
    (useState as jest.Mock).mockImplementation(() => [null, jest.fn()]);
    (useState as jest.Mock).mockImplementation(() => [book, jest.fn()]);

    const {asFragment} = render(<BookListSearch titleOrAuthor={""}/>)

    expect(asFragment()).toMatchSnapshot();
  })
})