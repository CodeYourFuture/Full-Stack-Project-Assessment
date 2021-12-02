import React from "react";
import VideoListSort from "../VideoListSort/VideoListSort";
import AddVideoDrawer from "../AddVideoDrawer/AddVideoDrawer";
import VideoList from "../VideoList/VideoList";

const Main = ({ videos, setVideos, videoSortOrder, setVideoSortOrder }) => {
  return (
    <main>
      <VideoListSort
        setVideoSortOrder={setVideoSortOrder}
        videoSortOrder={videoSortOrder}
      />
      <AddVideoDrawer videos={videos} setVideos={setVideos} />
      <VideoList videos={videos} setVideos={setVideos} />
    </main>
  );
};

export default Main;
