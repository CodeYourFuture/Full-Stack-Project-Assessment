import React, { useState, useEffect } from "react";
import "./App.css";
import AddVideo from "./AddVideo";
import Video from "./Video";
import VideoSearch from "./VideoSearch";
// import ExampleResponse from "./exampleresponse.json";
import Footer from "./Footer";

function App() {
  const [videosData, setVideosData] = useState([]);

  //  UseEffect and fetching data
  useEffect(() => {
    fetch("/api")
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          return response.json();
        }
      })
      .then((data) => {
        console.log("Data:", data);
        setVideosData(data);
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <h1>Video Recommendation</h1>
        <VideoSearch allVideos={videosData} searchedVideos={setVideosData} />
      </header>
      <main>
        <AddVideo videosArr={videosData} addedVideos={setVideosData} />
        <ul className="videos-list">
          <Video videos={videosData} updatedList={setVideosData} />
        </ul>
      </main>
      <Footer />
    </div>
  );
}

export default App;
