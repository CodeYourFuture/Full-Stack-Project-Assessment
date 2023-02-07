import React,{useState} from "react";
import "./App.css";
import AddVideo from "./component/AddVideo";
import ListVideo from "./component/ListVideo";



function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h4>Video Recommendation</h4>
      </header>
      <AddVideo/>
      <ListVideo/>
    </div>
  );
}


export default App;