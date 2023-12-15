import {render, screen,} from "@testing-library/react";
import { BookCreate } from "./BookCreate";
import "@testing-library/jest-dom";

describe("Book to Create", () => {
  test("snapShot: render Book Create", ()=> {
    const {asFragment} = render(<BookCreate/>)

    expect(asFragment()).toMatchSnapshot();
  })
})