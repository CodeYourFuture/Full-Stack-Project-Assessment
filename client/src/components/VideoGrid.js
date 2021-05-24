import React from "react";
import VideoContainer from "./VideoContainer";

const VideoGrid = ({
  searchValue,
  videoList,
  setVideoList,
  extractVideoId,
}) => {
  let filteredVideoList;

  if (searchValue !== "") {
    filteredVideoList = videoList.filter((video) =>
      video.title.toLowerCase().includes(searchValue.toLowerCase())
    );
  } else {
    filteredVideoList = videoList;
  }

  console.log(filteredVideoList);

  filteredVideoList.sort((a, b) => (a.rating < b.rating ? 1 : -1));
  return (
    <div>
      {filteredVideoList.map((video) => (
        <VideoContainer
          key={video.title}
          videoId={extractVideoId(video.url)}
          videoTitle={video.title}
          videoRating={video.rating}
          videoList={videoList}
          setVideoList={setVideoList}
        />
      ))}
    </div>
  );
};

export default VideoGrid;
