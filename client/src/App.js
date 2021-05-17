import "./App.css";
import exampleResource from "./exampleResponse.json";
import { useState } from "react";
import Video from "./Video";
import AddVideo from "./AddVideo";

function App() {
  const [videos, setVideos] = useState(exampleResource);
  //const videoData = exampleResource;

  // delete video function
  function deleteVideo(event) {
    event.preventDefault();
    const target = event.target;
    const videoId = target.parentNode.parentNode.id;
    console.log(videoId);
    const filteredVideos = videos.filter(
      // videoId is a string needs to be changed to a number
      (video) => video.id !== Number(videoId)
    );
    setVideos(filteredVideos);
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>
          <em>Video Recommendation</em>
        </h1>
      </header>
      <AddVideo />
      <div className="videos-container">
        {videos.map((video, index) => (
          /* video info holder div with unique sid  */
          <Video
            key={index}
            id={video.id}
            title={video.title}
            url={video.url}
            deleteVideo={deleteVideo}
            rating={video.rating}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
