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

   function addNewVideo(title, url){
   const newVideos = [...videos,{ id:videos.length, title , url,rating:0}];

     setVideos(newVideos);
   }

  function deletVideo(id) {
    const remainingVideos = videos.filter((vid) => {
      return vid.id !== id;
    });
    // console.log(remainingVideos);

    setVideos(remainingVideos);
  }
    
  return (
    <div className="App">
      <header className="App-header">
        <h1>Video Recommendation</h1>
      </header>

      <AddVideo addNewVideo={addNewVideo} />
      <Toptext />

      {videos.map((video) => (
        <VideoCard
          key={video.id}
          id={video.id}
          title={video.title}
          url={video.url}
          rating={video.rating}
          delete={deletVideo}
        />
      ))}
    </div>
  );
};

export default App;


