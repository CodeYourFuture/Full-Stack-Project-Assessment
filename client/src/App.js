import React from "react";
import "./App.css";
import Form from "./Form";
import ListOfVideos from "./ListOfVideos";
import "./App.css";
// import example from "./exampleresponse.json";
function App(props) {
  return (
    <div className="App">
      <header className="App-header bg-primary text-white">
        <h1>Video Recommendation</h1>
      </header>
      <Form />
      <ListOfVideos />
    </div>
  );
}

export default App;
