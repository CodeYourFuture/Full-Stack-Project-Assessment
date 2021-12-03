import React from "react";
import VideoCards from "./VideoCards.js";

const Videos = ({ searchVideoData }) => {
  return (
    <section>
      {searchVideoData.map((video) => (
        <VideoCards video={video} key={video.id} />
      ))}
    </section>
  );
};
export default Videos;
