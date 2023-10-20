import {render, screen,} from "@testing-library/react";
import { BookListSearch } from "./BookListSearch";
import "@testing-library/jest-dom";

describe("BookListSearch", () => {
  test("snapShot: render BookListSearch", ()=> {
    const {asFragment} = render(<BookListSearch/>)

    expect(asFragment()).toMatchSnapshot();
  })
})