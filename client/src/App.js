import React from "react";
import "./App.css";
import Form from "./Form";
import Videos from "./Videos";
import exampleresponse from "./exampleresponse.json";


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Video Recommendation</h1>
      </header>
      <Form videos={exampleresponse}/>
      <Videos videos={exampleresponse} />
    </div>
  );
}

export default App;
