import "./App.css";
import Video from "./Video";
import AddVideoButton from "./AddVideoButton";
import { useState } from "react";




function App() {


 const [videos, setVideos] = useState([]);

 const addVideo = (title, url) => {
   setVideos([...videos, { title, url, votes: 0, id: videos.length }]);
 };

 const removeVideo = (id) => {
   setVideos(videos.filter((video) => video.id !== id));
 };


  return (
    <div className="App">
      <header className="App-header">
        <h1>React Video Recommendation Engine</h1>
        <AddVideoButton onVideoAdded={addVideo} />
      </header>
      {videos.map((video) => (
        <Video
          key={video.id}
          id={video.id}
          title={video.title}
          url={video.url}
          votes={video.votes}
          onVideoRemoved={removeVideo}
        />
      ))}
    </div>
  );
}

export default App;
