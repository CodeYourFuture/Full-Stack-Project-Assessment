import React, { useContext } from "react";
import AddVideo from "./AddVideo";
import VideoCard from "./VideoCard";

import { VideoContext } from "../contexts/VideoContext";

function VideoContents() {
  const { state } = useContext(VideoContext);
  console.log(state.data);

  return (
    <div className="d-flex flex-column align-items-center">
      <AddVideo />
      <div className="row d-flex justify-content-center m-3">
        {state.data
          .filter((video) => video.title.includes(state.searchText))
          .map((video) => {
            return <VideoCard key={video.id} data={video} />;
          })}
      </div>
    </div>
  );
}

export default VideoContents;
