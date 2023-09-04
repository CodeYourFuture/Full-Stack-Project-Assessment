import React, { useEffect, useState } from "react";
import CardsContainer from "./CardsContainer";
import VideoForm from "./VideoForm";

function MainContainer() {
  const [videoData, setVideoData] = useState();
  const [fetchData, setFetchData] = useState(true);

  useEffect(() => {
    if (fetchData) {
      fetch("http://localhost:5000/videos")
        .then((response) => response.json())
        .then((data) => setVideoData(data));
    }
    console.log(videoData);
    setFetchData(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchData]);

  console.log("Video Data from MainContainer---> ", videoData);
  return (
    <div>
      <VideoForm
        setFetchData={setFetchData}
        videoData={videoData}
        setVideoData={setVideoData}
      />
      <CardsContainer
        setFetchData={setFetchData}
        videoData={videoData}
        setVideoData={setVideoData}
      />
    </div>
  );
}

export default MainContainer;
