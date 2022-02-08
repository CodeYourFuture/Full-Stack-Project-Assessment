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

  const removeItem = (item) => {
    const filteredVid = vid.filter(video => video.title !== item.title);
    setVid([...filteredVid]);
  }
  return (
    <div className="App">
      <header className="App-header">
        <h1>Video Recommendation</h1>
      </header>
      <Form addVideos={addData}/>
      <Videos videos={vid} delete={removeItem} />
    </div>
  );
}

export default App;
