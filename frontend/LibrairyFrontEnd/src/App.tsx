import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import Books from "./Component/Books";
import { FetchOpinions } from "./Component/FetchOpinion";
import AddBook from "./Component/AddBook";

function App() {
  return (
    <div className="App">
      <AddBook />
    </div>
  );
}
export default App;
