import Video from "./Video";
import Data from "./exampleresponse.json";
import { useState } from "react";

function getVideos() {
  return Data;
}

function VideoContainer() {
  const [videos, SetVideos] = useState(getVideos);
  //SetVideos(getVideos());

  function removeVideo(index) {
    const newVideos = videos.filter((video, i) => i !== index);
    SetVideos(newVideos);
  }
  const allVideos = videos.map((video, index) => {
    const remove = () => removeVideo(index);
    const videoId = video.url.split("v=")[1];
    return (
      <Video
        id={videoId}
        title={video.title}
        rating={video.rating}
        remove={remove}
      ></Video>
    );
  });
  return <div className="videoContainer">{allVideos};</div>;
}

export default VideoContainer;
