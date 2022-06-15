import React, { useState, useEffect } from "react";
import Video from "./component/Video";
import Header from "./component/Header";
import AddVideo from "./component/AddVideo";

function HomePage() {
  const [videos, setVideos] = useState([]);

  const getData = async () => {
    const res = await fetch("http://localhost:4000/api/videos");
    const data = await res.json();
    setVideos(data);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <Header />
      <AddVideo videoData={videos} />
      <Video videoData={videos} />
    </div>
  );
}

export default HomePage;
