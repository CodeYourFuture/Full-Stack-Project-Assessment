import React, { useState } from "react";
import "./App.css";
// import 'bootstrap/dist/css/bootstrap.css';
import Header from "./Header";
import exampleresponse from "./data/exampleresponse.json";
import Video from "./Video";
import AddVideo from "./AddVideo";


function App() {
  const [videoList, setVideoList] = useState(exampleresponse);
  return (
    <main>
      <Header />
      <AddVideo videoList={videoList} setVideoList={setVideoList} />
      <div className="videos-outer-wrap">
        <Video videoList={videoList} setVideoList={setVideoList} />
      </div>
    </main>
  );
}

export default App;
