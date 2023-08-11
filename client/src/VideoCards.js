import React from "react";
import SingleVideoCard from "./SingleVideoCard";
import exampleResponse from "./exampleResponse.json";

function VideoCards() {
  return (
    <>
      {exampleResponse.map((video) => (
        <SingleVideoCard key={video.id} title={video.title} url={video.url} />
      ))}
    </>
  );
}

export default VideoCards;
