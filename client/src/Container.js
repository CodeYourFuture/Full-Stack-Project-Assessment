import React, { useState } from "react";
import VideoSection from "./VideoSection";
import VideoContainer from "./VideoContainer";
import videoData from "./exampleresponse.json";

const Container = () => {
  const [videos, setVideos] = useState(videoData);

  const handleRemove = (id) => {
    setVideos((updatedVideo) => updatedVideo.filter((v) => v.id !== id));
  };
  
  let idCounter = 1;
  const handleAddVideo = (video) => {
    setVideos((updatedVideos) => {
      const newVideo = { ...video, id: idCounter++, rating: 0 };
      return [...updatedVideos, newVideo];
    });
  };

  const handleUpVote = (id) => {
    setVideos((updatedVideo) =>
      updatedVideo.map((video) => {
        if (video.id === id) {
          return {
            ...video,
            rating: video.rating + 1,
          };
        }
        return video;
      })
    );
  };

  const handleDownVote = (id) => {
    setVideos((updatedVideo) =>
      updatedVideo.map((video) => {
        if (video.id === id) {
          return {
            ...video,
            rating: video.rating - 1,
          };
        }
        return video;
      })
    );
  };


  return (
    <div>
      <VideoContainer onAdd={handleAddVideo} />
      <VideoSection
        videos={videos}
        upVote={handleUpVote}
        downVote={handleDownVote}
        removeVideo={handleRemove}
      />
    </div>
  );
};

export default Container;
