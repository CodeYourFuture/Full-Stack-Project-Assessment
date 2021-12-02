import React from "react";
import AddVideo from "./AddVideo";

const Header = ({ videoData, setVideoData }) => {
  const handleAddVideo = (title, url) => {
    const newVideoData = {
      id: Math.floor(Math.random() * 1000),
      title: title,
      url: url,
      rating: 0,
    };
    setVideoData([...videoData, newVideoData]);
  };
  return (
    <div>
      <header
        className="card text-white bg-info mt-2 pt-2"
        style={{ height: "80px" }}
      >
        <h1>Video Recommendation</h1>
      </header>
      <AddVideo handleAddVideo={handleAddVideo} />
    </div>
  );
};

export default Header;
