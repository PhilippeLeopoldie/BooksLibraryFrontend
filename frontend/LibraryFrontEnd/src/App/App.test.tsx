import {render, screen,} from "@testing-library/react";
import { App } from "./App";
import "@testing-library/jest-dom";

describe("App routes", () => {
  test("snapShot: render nav bar", ()=> {
    const {asFragment} = render(<App/>)

    expect(asFragment()).toMatchSnapshot();
  })
})