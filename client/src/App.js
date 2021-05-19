import "./App.css";
import exampleResource from "./exampleResponse.json";
import { useState } from "react";
import Video from "./Video";
import AddVideo from "./AddVideo";

function App() {
  let [videos, setVideos] = useState(exampleResource);
  let [giveId, setGiveId] = useState(1000);
  const [newVideo, setNewVideo] = useState({
    title: "",
    url: "",
  });

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

  // data validator
  function validateInput(newVideo) {
    // regex expression for checking a youtube video
    const regex = /(?:https?:\/\/)?(?:youtu\.be\/|(?:www\.|m\.)?youtube\.com\/(?:watch|v|embed)(?:\.php)?(?:\?.*v=|\/))([a-zA-Z0-9_-]+)/;
    if (newVideo.title.length > 0 && newVideo.url.match(regex)) {
      return newVideo;
    } else {
      alert("insert data ");
    }
  }

  // handle multiple input change

  function handleChange(evt) {
    evt.preventDefault();
    const value = evt.target.value;
    setNewVideo({
      ...newVideo,
      [evt.target.name]: value,
    });
  }

  // handle submit button

  function handleSubmit(event) {
    event.preventDefault();
    validateInput(newVideo);
    // ++giveId gets the value of giveId after increment
    setGiveId((giveId) => ++giveId);
    newVideo["id"] = ++giveId;
    newVideo["rating"] = 0;
    setVideos(videos.concat(newVideo));
    console.log(videos);
  }
  return (
    <div className="App">
      <header className="App-header">
        <h1>
          <em>Video Recommendation</em>
        </h1>
      </header>
      <AddVideo handleChange={handleChange} handleSubmit={handleSubmit} />
      <div className="videos-container">
        {videos.map((video, index) => (
          /* video info holder div with unique id  */
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
