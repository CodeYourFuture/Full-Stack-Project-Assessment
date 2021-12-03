import React, { useState } from "react";
import VideoListSort from "../VideoListSort/VideoListSort";
import AddVideoDrawer from "../AddVideoDrawer/AddVideoDrawer";
import VideoList from "../VideoList/VideoList";
import SearchBox from "../SearchBox/SearchBox";

const Main = ({ videos, setVideos, videoSortOrder, setVideoSortOrder }) => {
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <main>
      <VideoListSort
        setVideoSortOrder={setVideoSortOrder}
        videoSortOrder={videoSortOrder}
      />
      <SearchBox setSearchTerm={setSearchTerm} />
      <AddVideoDrawer videos={videos} setVideos={setVideos} />
      <VideoList
        videos={videos}
        setVideos={setVideos}
        searchTerm={searchTerm}
      />
    </main>
  );
};

export default Main;
