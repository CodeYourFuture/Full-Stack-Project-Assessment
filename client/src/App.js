import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import AddVideo from "./components/AddVideo";
import Data from "./exampleresponse.json";
import VideosPage from "./components/VideosPage";
import React, {useState} from 'react';

const data = Data.sort((a, b) => a.votes - b.votes ).reverse();
function App() {
  const [videos, setVideos] = useState(data)
  return (
    <div className="App">
         <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<VideosPage setVideos={setVideos} videos={videos} />} />
          <Route path="/addVideo" element={<AddVideo setVideos={setVideos} videos={videos}/>} />
          </Routes>
      </BrowserRouter>
   
      {/* <AddVideo /> */}
   
      {/* <Videos data={Data} /> */}
    </div>
  );
}

export default App;
