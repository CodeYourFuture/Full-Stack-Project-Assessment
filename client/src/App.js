import React, { useState, useEffect } from 'react';
import "./App.css";
// import data from "./data/exampleresponse.json";
import Header from "./component/Header";
import AddVideo from "./component/AddVideo";
import Search from "./component/Search";
import DisplayVideo from "./component/DisplayVideo";
function App() {
  const [videoData, setVideoData] = useState([]);
  const [search, setSearch] = useState("");


  useEffect(() => {
    fetch("http://localhost:5000/")
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        } else {
          throw new Error("There is an error with the service");
        }
      })
      .then((videoData) => {
        console.log(videoData);
        setVideoData(videoData);
      })
      .catch((e) => console.log(e));    
  }, [])


  return (
    <div className="App">
      <Header />
      <div className="d-flex justify-content-center align-items-center">
        <AddVideo videoData={videoData} setVideoData={setVideoData}/>
        <Search search={search} handleSearch={(e) => setSearch(e.target.value)}/>
      </div>      
        <DisplayVideo videoData={videoData} setVideoData={setVideoData} search={search} />
    </div>
  );
}

export default App;
