import "./App.css";
import AddVideoButton from "./Buttons/AddVideoButton";
import Header from "./Components/Header";
import data from "./exampleresponse.json";
import Video from "./Components/Video";
import React, { useState } from "react";
// import SearchBar from "./Buttons/SearchBar"

console.log(data);
function App({video}) {
    const [videos, setVideos] = useState(data);
  return (
    <div className="App">
      <Header />
      <AddVideoButton  videos={videos} setVideos={setVideos}/>
      {/* <SearchBar /> */}
      <div className="container-fluid">
        {data.map((video, key) => (
          <Video video={video} key={key} />
        ))}
      </div>
    </div>
  );
}

export default App;
