import React, { useState } from 'react';
import "./App.css";
import data from "./data/exampleresponse.json";
import Header from "./component/Header";
import AddVideo from "./component/AddVideo";
import Search from "./component/Search";
import DisplayVideo from "./component/DisplayVideo";


 

function App() {
  const [videoData, setVideoData] = useState(data);
  const [search, setSearch] = useState("");

  const sortedData = videoData.sort((video1, video2) => (video2.rating) - (video1.rating))
                              .filter((video) => video.title.toUpperCase().includes(search.toUpperCase()));
  

   return (
    <div className="App">
      <Header />
      <div className="d-flex justify-content-center align-items-center">
        <AddVideo videoData={videoData} setVideoData={setVideoData}/>
        <Search search={search} handleSearch={(e) => setSearch(e.target.value)}/>
      </div>      
      <DisplayVideo sortedData={sortedData} videoData={videoData} setVideoData={setVideoData}/>
    </div>
  );
}

export default App;
