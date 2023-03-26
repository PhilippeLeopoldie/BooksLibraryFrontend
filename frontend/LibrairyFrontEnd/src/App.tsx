import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import Books from "./Component/Books";
import { FetchOpinions } from "./Component/FetchOpinion";
import AddBook from "./Component/AddBook";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <AddBook />
      <Books />
    </div>
  );
}
export default App;
