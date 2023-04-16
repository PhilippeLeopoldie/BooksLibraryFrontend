import { useContext } from "react";
import { Routes, BrowserRouter, Route, Link } from "react-router-dom";
import { OpinionContext } from "./Context";
import "./App.css";
import AddBook from "./Component/AddBook";
import OpinionUpdate from "./Component/OpinionUpdate";
import Home from "./Component/Home";

function App() {
  const initialContext = useContext(OpinionContext);

  return (
    <div className="App">
      <BrowserRouter>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/addBook">Add a review</Link>
          </li>
        </ul>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/addBook" element={<AddBook />}></Route>
          <Route
            path="/viewUpdate"
            element={
              <div>
                <OpinionContext.Provider value={initialContext}>
                  <OpinionUpdate />
                </OpinionContext.Provider>
              </div>
            }
          ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;
