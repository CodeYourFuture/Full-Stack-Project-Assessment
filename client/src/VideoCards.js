import React from "react";
import SingleVideoCard from "./SingleVideoCard";
// import exampleResponse from "./exampleResponse.json";

function VideoCards({ videos, setVideos }) {
  return (
    <>
      {videos.map((video) => (
        <SingleVideoCard
          key={video.id}
          videoId={video.id}
          filterVideos={videos}
          setFilterVideos={setVideos}
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
