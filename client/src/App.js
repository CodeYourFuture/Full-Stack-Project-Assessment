import "./App.css";
import React, { useState } from "react";

import Search from "./components/Seacrh";
import Selection from "./components/Selection";
import Container from "./components/Container";

function App() {
  const [videos, setVideos] = useState([]);

  const addLocally = (data) => {
    videos.push(data);
  };

  console.log(videos);
  return (
    <>
      <header>
        <h1>Video recommendation</h1>
      </header>
      <Search addVideo={addLocally} />
      <Selection />
      <Container setVideos={setVideos} videos={videos} />
    </>
  );
}

export default App;
