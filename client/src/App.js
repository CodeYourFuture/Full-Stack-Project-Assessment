import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
// import ReactDOM from "react-dom";
// import "./App.css";
import InsertVideo from "./InsertVideo";
// import video from "./singleVideo.json";
import defaultVideos from "./exampleresponse.json";
import AddNewVideo from "./AddNewVideo";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <header className="my-App-header">
          <h1>Video Recommendation</h1>
        </header>
        <body>
          <div className="upper-div">
            <Link to="/add-new-video">
              <button className="add-video-btn">Add Video</button>
            </Link>
            <label>Search</label>
            <input></input>
          </div>
          <div className="all-videos">
            {defaultVideos.map((video, key) => (
              <InsertVideo video={video} key={key} />
            ))}
          </div>
        </body>
      </div>
      <Routes>
        <Route path="/add-new-video" component={<AddNewVideo />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
