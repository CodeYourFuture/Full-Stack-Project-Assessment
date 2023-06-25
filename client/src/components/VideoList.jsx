import React, { useState } from "react";
import Video from "./Video";
import "./VideoList.css";
import Data from "./exampleresponse.json";
import NavBar from "./NavBar";

const VideoList = () => {
      
     const handleAddVideo = (newVideo) => {
          setVideoList((prevVideoList) => [...prevVideoList, newVideo]);
        };

      const [VideoList, setVideoList] = useState(Data);

      const sortedVideoList = [...VideoList].sort(
        (a, b) => b.rating - a.rating
      );

      const handleDeleteVideo = (id) => {
        
      const index = VideoList.findIndex((video) => video.id === id);
        if (index !== -1) {
         
      const updatedVideoList = [...VideoList];
          updatedVideoList.splice(index, 1);
          setVideoList(updatedVideoList);
        }
      };
  return (
    <>
      <NavBar onAddVideo={handleAddVideo} VideoList={VideoList} />

      <div className="VideoList">
        {sortedVideoList.map((video) => (
          <Video
            key={video.id}
            id={video.id}
            title={video.title.trim() || "Untitled"}
            url={video.url}
            rating={video.rating}
            onDelete={handleDeleteVideo}
          />
        ))}
      </div>
    </>
  );
};

export default VideoList;
