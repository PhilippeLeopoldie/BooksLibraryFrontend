import { Opinion } from "./Opinion";
import { act, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

global.fetch = jest.fn().mockImplementation(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve([
        { Opinion: { id: 1, view: "View 1", userName: "userName 1", rate: 2 } },
      ]),
    status: 200,
    hearders: new Headers(),
  })
);
describe("Opinions Component Tests", () => {
  it("Should render Loading message initially", async () => {
    //Arrange
    await act(async () => {
      render(<Opinion bookId={1} onEdit={() => {}} toCreate={()=> {}} />);
    });
  
    //Act
    const loadingMessage = screen.getByText("Loading...");
  
    //Expect
    expect(loadingMessage).toBeInTheDocument();
  });

  
})

