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

  return (
    <>
      <SearchBar search={search} />
      <AddVideoForm />
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
