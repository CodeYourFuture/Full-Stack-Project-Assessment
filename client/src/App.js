import React, { useState, useEffect } from "react";

import "./App.css";
import SuppliedData from "./exampleresponse.json";
import VideoList from "./VideoList";
import AddVideo from "./AddVideo";
import SearchVideo from "./SearchVideo";


function App(){
  const [VideosData, setVideosData] = useState(SuppliedData);
  const [searchVideos, setSearchVideos] = useState([]);
//console.log(VideosData);
useEffect(() => {
    fetch("http://localhost:3001/")
      .then(response => response.json())
      .then(data => setVideosData(data))
      .catch(error => console.error(error));
  }, []);
  function addVideo(title, url) {
    let newVideo = {
      id: Math.floor(Math.random() * 1000000),
      title: title,
      url: url,
      rating: Math.floor(Math.random() * 10000),
    };

    let updateList = VideosData.concat(newVideo);
    setVideosData(updateList);
  }

    //Search Video function 
    function search(e) {
      e.preventDefault();
      let searchQuery = e.target.value;
      console.log("searching:", searchQuery);

      const filteredResult = VideosData.filter((element) => {
        return element.title.toLowerCase().includes(searchQuery.toLowerCase());
      });
      setSearchVideos(filteredResult);
    }
    
    // Function delete videos 
    const removeVideo = (id) => {
      const dataCopy = [...VideosData];
      console.log(`remove video with id:${id}`);

      const index = dataCopy.findIndex((video) => {
        return video.id === id;
      });
      dataCopy.splice(index, 1);
      setVideosData(dataCopy);
    };


    return (
      <div className="App">
        <header className="App-header">
          <h1>Video Recommendation</h1>
        </header>

        <div className="body-section">
          <SearchVideo search={search} />
          <AddVideo addVideo={AddVideo} />

          {searchVideos.length > 0 ? (
            <VideoList data={searchVideos} delete={removeVideo} />
          ) : (
            <VideoList data={VideosData} delete={removeVideo} />
          )}
        </div>
      </div>

    );
  }



export default App;
