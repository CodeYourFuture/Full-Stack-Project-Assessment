
import React, { useState } from "react";
import data from "./exampleResponse.json";
import Search from "./Components/Search.js"
import Header from "./Components/Header";
import NewVid from "./Components/NewVid.js";
import ShowVideo from "./Components/ShowVideo.js"
import "./App.css";
function App() {
const [inputValue, setInputValue] = useState("");

const filteredVideo = data.filter(video => (
video.title.toLowerCase().includes(inputValue.toLowerCase())
)) 
return (
<div className="App">
  <Header />
  <div className="add-search">
  <div>
  <NewVid />
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
