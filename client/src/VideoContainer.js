import AddVideo from "./AddVideo";
import Video from "./Video";
import Data from "./exampleresponse.json";
import { useState } from "react";

function getVideos() {
  return Data;
}

function getRatings() {
  console.log(Data.rating);
  return Data;
}

function VideoContainer() {
  const [videos, SetVideos] = useState(getVideos);
  const [likes, setLikes] = useState(getRatings);
  //SetVideos(getVideos());

  function removeVideo(index) {
    const newVideos = videos.filter((video, i) => i !== index);
    SetVideos(newVideos);
  }

  function addLike() {
    setLikes(likes + 1);
  }

  const allVideos = videos.map((video, index) => {
    const remove = () => removeVideo(index);
    const videoId = video.url.split("v=")[1];
    const like = () => addLike();
    return (
      <div>
        <Video
          id={videoId}
          title={video.title}
          rating={video.rating}
          remove={remove}
          like={like}
        ></Video>
      </div>
    );
  });
  return (
    <div>
      <AddVideo></AddVideo>
      <div className="videoContainer">{allVideos};</div>
    </div>
  );
}

export default VideoContainer;
