import React, { useState } from "react";
import SearchBar from "./SearchBar";
import AddVideoForm from "./AddVideoForm";
import SingleVideoCard from "./SingleVideoCard";
import exampleResponse from "./exampleresponse.json";

function VideoCards() {
  const [videos, setVideos] = useState(exampleResponse);

  function handleDelete(id) {
    setVideos((prevVideo) => {
      return prevVideo.filter((v) => v.id !== id);
    });
  }

  function search(searchValue) {
    const filteredVideos = exampleResponse.filter((item) =>
      item.title.toLowerCase().includes(searchValue.toLowerCase())
    );
    setVideos(filteredVideos);
  }

  function addVideo(v) {
    const videoId = v.url.match(
      /(?:\/|%3D|v=|vi=)([0-9A-Za-z_-]{11})(?:[%#?&]|$)/
    )[1]; //this piece of code extract the Youtube video id given from a Youtube url.
    setVideos((currVideos) => {
      return [...currVideos, { ...v, rating: 0, id: videoId }];
    });
  }

  return (
    <>
      <SearchBar search={search} />
      <AddVideoForm addVideo={addVideo} />
      {videos.map((video) => (
        <SingleVideoCard
          key={video.id}
          title={video.title}
          url={video.url}
          rating={video.rating}
          deleteVideo={() => handleDelete(video.id)}
        />
      ))}
    </>
  );
}

export default VideoCards;
