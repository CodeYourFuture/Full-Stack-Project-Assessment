import 'bootswatch/dist/quartz/bootstrap.min.css'
import "./App.css";
import React, { useState } from "react";
import Videos from "./Videos";
import Search from "./Search";
import AddAVideo from "./AddAVideo";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faCheckSquare,
  faCoffee,
  faThumbsDown,
  faThumbsUp,
} from "@fortawesome/free-solid-svg-icons";

library.add(faThumbsDown, faThumbsUp, faCheckSquare, faCoffee);

function App() {
  const [searchInput, setSearchInput] = useState("");
  console.log(searchInput)

  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <div>
            <nav>
              <h1 className="title">The Video App</h1>
              <div className="nav--links">
                <Link to="/" className="button is-success is-outlined home">
                  Home
                </Link>

                <Link to="addvideo" className="button is-success is-light home">
                  Add New
                </Link>
                <Search
                  searchInput={searchInput}
                  setSearchInput={setSearchInput}
                />
              </div>
            </nav>
          </div>
        </header>

        <div className="content">
          <Routes>
            <Route path="/" element={<Videos searchInput={searchInput} />} />
            <Route path="addvideo" element={<AddAVideo />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
