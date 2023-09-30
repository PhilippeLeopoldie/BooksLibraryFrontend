import { useContext } from "react";
import { Routes, BrowserRouter, Route, Link } from "react-router-dom";
import { OpinionContext } from "./Context";
import "./App.css";
import {AddBook} from "./Component/Book/AddBook";
import {OpinionEdit} from "./Component/Opinion/OpinionEdit";
import {Home} from "./Component/Home";
import { BookList } from "./Component/BookList/BookList";

export const App = () => {
  const initialContext = useContext(OpinionContext);

  return (
    <div className="App"> 
      <BrowserRouter>
      <div className="nav">
        <ul className="liste">
          <dl className="nav-data">
            <Link className="nav-link home" to="/">Home</Link>
          </dl>
          <dl className="nav-data">
            <Link  className="nav-link" to="/addBook">Add a review</Link>
          </dl>
        </ul>
      </div>
        
        <Routes>
          <Route path="/" element={<BookList />}></Route>
          <Route path="/addBook" element={<AddBook />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
