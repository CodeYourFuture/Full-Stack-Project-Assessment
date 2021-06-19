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

  const filteredData = videoData.filter((video) => video.title.toUpperCase().includes(search.toUpperCase()));
  
   return (
    <div className="App">
      <Header />
      <div className="d-flex justify-content-center align-items-center">
        <AddVideo videoData={videoData} setVideoData={setVideoData}/>
        <Search search={search} handleSearch={(e) => setSearch(e.target.value)}/>
      </div>      
      <DisplayVideo filteredData={filteredData} videoData={videoData} setVideoData={setVideoData}/>
    </div>
  );
}

export default App;
