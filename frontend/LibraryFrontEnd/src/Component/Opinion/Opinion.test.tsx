import { Opinion } from "./Opinion";
import { act, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Book } from "../Book/Book";

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
  it("Should not render Loading message when book with no opinion", async () => {
    //Arrange
    type Book={
      id:number,
      title: string,
      author:string
    }
    const book :Book = {
      id:1,
      title:"title 1",
      author: "author 1"
    }
    await act(async () => {
      render(<Opinion book={book} onEdit={() => {}} toCreate={()=> {}} />);
    });
  
    //Act
    const loadingMessage = screen.queryByText("Loading...");
  
    //Expect
    expect(loadingMessage).toBeNull();
  });

  
})

