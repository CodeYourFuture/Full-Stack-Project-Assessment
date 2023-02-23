import Video from "./Video";
import Data from "./exampleresponse.json";
import { useState } from "react";

function getVideos() {
  return Data;
}

function getRatings() {
  return Data.rating;
}

function VideoContainer() {
  const [videos, SetVideos] = useState(getVideos);
  const [like, setLike] = useState(getRatings);
  //SetVideos(getVideos());

  function removeVideo(index) {
    const newVideos = videos.filter((video, i) => i !== index);
    SetVideos(newVideos);
  }

  function addLike() {
    setLike(like + 1);
  }

  const allVideos = videos.map((video, index) => {
    const remove = () => removeVideo(index);
    const videoId = video.url.split("v=")[1];
    const like = () => addLike();
    return (
      <Video
        id={videoId}
        title={video.title}
        rating={video.rating}
        remove={remove}
        like={like}
      ></Video>
    );
  });
  return <div className="videoContainer">{allVideos};</div>;
}

export default VideoContainer;
