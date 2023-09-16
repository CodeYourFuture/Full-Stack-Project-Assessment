import React from "react";
import "./App.css";
// import videoData from "./exampleresponse.json";
import Videocard from "./components/Videocard";
import Addvideo from "./components/Addvideo";


// console.log(videoData);

function App() {
const[videos, setVideos] = React.useState ([])

fetch("http://127.0.0.1:5000/")
.then((response) => response.json())
.then(data => {setVideos(data)});

const videoElements = videos.map((video) => {
    return <Videocard name={video.title} link={video.url} rating={video.rating}/>;
  })

// const youTubeLinks = videoData.map((video) => {
//   return <url link={links.url} />
// })
function plusRating() {
  
}
  return (
    <div className="App">
      <header className="App-header">
        <h1>Video Recommendation</h1>
      </header>
      <Addvideo />
      <div>{videoElements}</div>
      
    </div>
  );
}

export default App;
