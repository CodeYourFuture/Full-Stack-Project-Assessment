import React,{useState} from "react";
import "./App.css";
import AddVideo from "./component/AddVideo";
import ListVideo from "./component/ListVideo";
import VoteVideo from "./component/VoteVideo";



function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h4>Video Recommendation</h4>
      </header>
      <AddVideo/>
      <ListVideo/>
      {/* <VoteVideo/> */}
    </div>
  );
}


export default App;