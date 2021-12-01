// import "./App.css";
import data from "./exampleresponse.json";
import { useReducer, useState } from "react";
import VideoCard from "./VideoCard";
import Toptext from "./topText";
import AddVideo from "./AddVideo";






function App() {
  //console.log(data);
  let [videos, setVideos] = useState(data);

  // let[vote,  ] = useState(0);

  

  function deletVideo(id) {
    const remainingVideos = videos.filter((vid) => {
      return vid.id !== id;
    });
    // console.log(remainingVideos);

    setVideos(remainingVideos);
  }
     function addVideoToList() {
    let newVideo = { title:{titleInput}, url:{urlInput }};
      videos.push(newVideo);
  }
  return (
    <div className="App">
      <header className="App-header">
        <h1>Video Recommendation</h1>
      </header>

      <AddVideo />
      <Toptext />

      {videos.map((video) => (
        <VideoCard
          key={video.id}
          id={video.id}
          title={video.title}
          url={video.url}
          rating={video.rating}
          delete={deletVideo}
          addVideoToList ={ addVideoToList }

        />
      ))}
    </div>
  );
};

export default App;


