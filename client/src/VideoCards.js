import React, { useState } from "react";
import SingleVideoCard from "./SingleVideoCard";
import exampleResponse from "./exampleResponse.json";

function VideoCards() {
  const [filterVideos, setFilterVideos] = useState(exampleResponse);

  function handleDelete(id) {
    setFilterVideos((prevVideo) => {
      return prevVideo.filter((v) => v.id !== id);
    });
  }

  return (
    <>
      {filterVideos.map((video) => (
        <SingleVideoCard
          key={video.id}
          title={video.title}
          url={video.url}
          deleteVideo={() => handleDelete(video.id)}
        />
      ))}
    </>
  );
}

export default VideoCards;
