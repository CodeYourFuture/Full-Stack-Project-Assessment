import React, { useContext } from "react";
import AddVideo from "./AddVideo";
import VideoCard from "./VideoCard";

import { VideoContext } from "../contexts/VideoContext";
import SortBy from "./SortBy";

function VideoContents() {
  const { state } = useContext(VideoContext);

  return (
    <div className="d-flex flex-column align-items-center">
      <AddVideo />
      <SortBy />
      <div className="row d-flex justify-content-center m-3">
        {state.data
          .filter((video) => video.title.includes(state.searchText))
          .sort((a, b) => {
            switch (state.sortStatus) {
              case "RATINGDESC":
                return a.rating - b.rating;
              case "RATINGASC":
                return b.rating - a.rating;
              default:
                return 0;
            }
          })
          .map((video) => {
            return <VideoCard key={video.id} data={video} />;
          })}
      </div>
    </div>
  );
}

export default VideoContents;
