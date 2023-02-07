import React, { useState, useEffect } from "react";
import "./App.css";
import AddNewVideo from "./AddNewVideo";
import SearchVideo from "./SearchVideo";
import PopulateVideos from "./PopulateVideos";

function App() {
  const [defaultVideoData, setDefaultVideoData] = useState([]);

  useEffect(() => {
    fetch("/videos")
      .then((response) => response.json())
      .then(data => {
        setDefaultVideoData(data.sort((a, b) => a.rating - b.rating))})
      .catch((e) => console.log(e));
    }, [])
    
  const handleSorting = (event) => {
    defaultVideoData.sort((a, b) => b.rating - a.rating);
    setDefaultVideoData(defaultVideoData);
    // console.log("Sort button clicked");
    console.log(defaultVideoData);
  };

  
  console.log(defaultVideoData);

  let [videoData, setVideoData] = useState(defaultVideoData);
  
    return (
      <div className="App">
        <header className="my-App-header">
          <h1>Video Recommendation</h1>
        </header>
        <AddNewVideo videoData={videoData} setVideoData={setVideoData} />
        <hr className="hr"></hr>
        <SearchVideo videoData={videoData} setVideoData={setVideoData} />
        <button className="asc-desc" onClick={handleSorting}>
          Desc
        </button>
        <PopulateVideos
          defaultVideoData={defaultVideoData}
          setDefaultVideoData={setVideoData}
          // setDefaultVideoData={setDefaultVideoData}
        />
      </div>
    );
}

export default App;
