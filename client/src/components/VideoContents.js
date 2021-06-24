import React, { useContext } from "react";
import AddVideo from "./AddVideo";
import VideoCard from "./VideoCard";

import { VideoContext } from "../contexts/VideoContext";

function VideoContents() {
  const { videoList, searchText } = useContext(VideoContext);
  console.log(videoList);

  return (
    <div className="d-flex flex-column align-items-center">
      <AddVideo />
      <div className="row d-flex justify-content-center m-3">
        {videoList
          .filter((video) => video.title.includes(searchText))
          .map((video, index) => {
            return <VideoCard key={video.id} data={video} />;
          })}
      </div>
    </div>
  );
}

export default VideoContents;
