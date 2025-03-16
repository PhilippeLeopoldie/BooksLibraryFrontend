import {render, screen,} from "@testing-library/react";
import { OpinionCreate } from "./OpinionCreate";
import "@testing-library/jest-dom";

describe("OpinionCreate", () => {
  test("snapShot: render Opinioncreate", ()=> {
    const {asFragment} = render(<OpinionCreate toCreate={()=> {}} created={()=>{}}/>)

    expect(asFragment()).toMatchSnapshot();
  })
})