import React, {useState} from "react";
import "../App.css";
import data from "../exampleresponse.json";
import VideoPanel from "./VideoPanel";
import Search from "./Search"

function App() {
  const [ videos, setVideos] = useState(data);
  const searchHandler = (searchText) => {
   let filteredVid = data.filter( video => video.title.toLowerCase().includes(searchText.toLowerCase()));
   setVideos(filteredVid);
  }
  return (
    <div className="App">
      <header className="App-header">
        <h1>Video Recommendation</h1>
      </header>
      < Search searchHandler={searchHandler}/>
      <main>
        {videos.map((video) =>
       <VideoPanel video={video}/>
        )}
      </main>
    </div>
  );
}

export default App;
