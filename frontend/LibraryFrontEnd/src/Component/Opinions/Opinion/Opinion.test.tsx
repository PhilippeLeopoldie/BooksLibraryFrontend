import { Opinion } from "./Opinion";
import { act, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Book } from "../../Books/Book/Book";

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

describe("Opinions Component Tests", () => {
  it("SnapShot: should render Opinion", () => {
    const {asFragment} =  
      render(<Opinion 
        book={book} 
        onEdit={() => {}} 
        //toCreate={()=> {}} 
        displayReview={()=>{}}/>);
    expect(asFragment()).toMatchSnapshot();
  })

  it("Should not render Loading message when book with no opinion", async () => {
    //Arrange
    
    await act(async () => {
      render(<Opinion 
        book={book} 
        onEdit={() => {}} 
        //toCreate={()=> {}}
        displayReview={()=>{}} />);
    });
  
    //Act
    const loadingMessage = screen.queryByText("Loading...");
  
    //Expect
    expect(loadingMessage).toBeNull();
  }); 
})

