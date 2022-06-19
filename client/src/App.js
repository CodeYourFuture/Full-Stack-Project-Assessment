
import "./App.css";
import Videos from "./Videos";
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
 
  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <div>
            <nav>
              <h1 className="title">The Video App</h1>
              <div className="nav--links">
                <Link to="/" className="button is-info is-outlined home">
                  Home
                </Link>

                <Link to="addvideo" className="button is-info is-light">
                  Add New
                </Link>
              </div>
            </nav>
          </div>
        </header>
       
        <div className="content">
         
          <Routes>
            <Route path="/" element={<Videos />} />
            <Route path="addvideo" element={<AddAVideo />} />
          </Routes>
        
        </div>
      </div>
      
    </BrowserRouter>
  );
}

export default App;
