import React from "react";
import AddVideoDrawer from "../AddVideoDrawer/AddVideoDrawer";
import VideoList from "../VideoList/VideoList";

const Main = ({videos, setVideos}) => {
  return (
    <main>
      <AddVideoDrawer videos={videos}  setVideos={setVideos} />
      <VideoList videos={videos} setVideos={setVideos} />
    </main>
  );
};

export default Main;
