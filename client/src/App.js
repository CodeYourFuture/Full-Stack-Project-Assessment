import React, { useState } from "react";
import "./App.css";
import Form from "./Form";
import exampleresponse from "./exampleresponse.json";
import Videos from "./Videos";


function App() {
  const [vid, setVid] = useState(exampleresponse);

  const addData = (title, url) => {
    let newVideo = {
      id: Math.floor(Math.random()* 1000000),
      title: title,
      url: url
    };
    vid.push(newVideo);
    setVid([...vid]);
    console.log(vid);
    console.log(newVideo);
    
  }
  return (
    <div className="App">
      <header className="App-header">
        <h1>Video Recommendation</h1>
      </header>
      <Form addVideos={addData}/>
      <Videos videos={vid} />
    </div>
  );
}

export default App;
