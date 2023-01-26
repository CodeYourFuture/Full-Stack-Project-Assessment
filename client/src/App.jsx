
import React, { useState} from "react";
import data from "./exampleResponse.json";
import Search from "./Search.js"
import Header from "./Header";
import AddVideo from "./AddVideo.js";
import ShowVideo from "./ShowVideo.js"
import "./App.css";
function App() {

  const [inputValue, setInputValue] = useState("");
  const [videos, setVideos] = useState(data);

  const filteredVideo = videos.filter(video => (
    video.title.toLowerCase().includes(inputValue.toLowerCase())
  )) 
return (
<div className="App">
  <Header />
  <div className="add-search">
  <div>
  <AddVideo addVideo={(video) => setVideos([...videos, video])} />
  </div>
  <div>
  <Search inputValue={inputValue} setInputValue={setInputValue} />
  </div>
  </div>
  <ShowVideo filteredVideo = {filteredVideo} />
  </div>
  );
}
export default App;
