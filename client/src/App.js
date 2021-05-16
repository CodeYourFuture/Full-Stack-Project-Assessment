import "./App.css";
import DeleteVideo from "./component/DeleteVideo";
import Search from "./component/Search";
import VideoRatings from "./component/VideoRatings";
import Videos from "./component/Videos";
import VideoTitle from "./component/VideoTitle";
import React, {useState} from "react";

import data from "./data/exampleresponse.json";
import AddVid from "./component/AddVid";

function App() {
  const [searchVal, setSearchVal] = useState();
  return (
    <div className="App">
      <header className="App-header">
        <h1 className="text-white bg-primary">Video Recommendation</h1>
      </header>
      <AddVid />
      <Search searchVal = {searchVal} setSearchVal = {setSearchVal}/>
      {data.map((video, index) => (
        <div key={index} className="container">
          <VideoTitle title={video.title} />
          <VideoRatings rating={video.rating} />
          <Videos video={video.url} />
          <DeleteVideo />
        </div>
      ))}
    </div>
  );
}

export default App;
