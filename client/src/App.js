import React, {useState} from "react";
import "./App.css";
import VideoAdder from "./VideoAdder";
import LikeDislike from "./LikeDislike";

function App() {
  const [url, setUrl] = useState(''); 
  return (
    <div className="App">
      <header className="App-header">
        <h1>Video Recommendation</h1>
      </header>
     
      <VideoAdder />
     </div>
  );
}

export default App;
