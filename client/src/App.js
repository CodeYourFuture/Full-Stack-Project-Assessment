import React, { useState } from "react";
import "./App.css";
import Header from "./Header.js";
import data from "./exampleresponse.json";
import "bootstrap/dist/css/bootstrap.min.css";
import AllVideoCards from "./AllVideoCards";
import AddVideo from "./AddVideo";

function App() {
  const [videos, setVideos] = useState(data);
  //console.log(data);
  //console.log(videos);
  return (
    <div className="App">
      <Header videos={videos} setVideos={setVideos} data={data} />
      <AddVideo videos={videos} setVideos={setVideos} data={data} />
      <AllVideoCards videos={videos} setVideos={setVideos} />
    </div>
  );
}

export default App;
