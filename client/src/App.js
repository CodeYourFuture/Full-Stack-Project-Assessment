import React from "react";
// import VideosObj from "./exampleresponse.json";
import Videos from "./Videos";
import "./App.css";

function App() {
     
  // let data = VideosObj.map((obj) => ({...obj, url: obj.url.replace("watch?v=", "embed/")}));
  
    return (
    <div className="App">
      <header className="App-header">
        <h1>Video Recommendation</h1>
      </header>
      <div className="App-holder">
        <Videos />
      </div>
    </div>
  );
}

export default App;
