import React from "react";
import SingleVideoCard from "./SingleVideoCard";
import exampleResponse from "./exampleResponse.json";

function VideoCards({ filterVideos, setFilterVideos }) {
  return (
    <>
      {filterVideos.map((video) => (
        <SingleVideoCard
          key={video.id}
          videoId={video.id}
          filterVideos={filterVideos}
          setFilterVideos={setFilterVideos}
          title={video.title}
          url={video.url}
        />
      ))}
    </>
  );
}
export default VideoCards;

// {
//     "id": 523523,
//     "title": "Never Gonna Give You Up",
//     "url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
//     "rating": 23
//   },
