import React from "react";
import VideosObj from "./exampleresponse.json";
import Videos from "./Videos";
import AddVid from "./AddVid";
import "./App.css";

function App() {
     
  let data = VideosObj;
  
    return (
    <div className="App">
      <header className="App-header">
        <h1>Video Recommendation</h1>
      </header>
      <div className="App-holder">
        <AddVid />
        <Videos data={data}/>
      </div>
    </div>
  );
}

export default App;
