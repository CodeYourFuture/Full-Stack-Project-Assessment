import React, { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Video from "./components/Video";
import data from "./exampleresponse.json";

function App() {
  //to delete, update the videos
  const [listOfVideos, setLIstOfVideos] = useState(data);

  const handleDelete = async (videoId) => {
    setLIstOfVideos(listOfVideos.filter((video) => video.id !== videoId));
    console.log(`Deleting video with ID ${videoId}`);
  };

  return (
    <div className="App">
      <Navbar />
      {/* <h1 className="text-3xl font-bold underline">Hello world!</h1> */}
      <div className="">
        {/* I use listOfVideos here to update the list of videos with new, and to delete them*/}
        {listOfVideos.map((video) => (
          <Video
            key={video.id}
            video={video}
            handleDelete={handleDelete}
           
          />
        ))}
      </div>
    </div>
  );
}

export default App;
