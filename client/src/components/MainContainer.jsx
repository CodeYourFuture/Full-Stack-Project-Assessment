import React, { useEffect, useState } from "react";
import CardsContainer from "./CardsContainer";
import VideoForm from "./VideoForm";
import { baseUrl } from "../config";

function MainContainer() {
  const [videoData, setVideoData] = useState();
  const [fetchData, setFetchData] = useState(true);

  useEffect(() => {
    if (fetchData) {
      fetch(`${baseUrl}/videos`) // prod
        .then((response) => response.json())
        .then((data) => setVideoData(data));
    }
    setFetchData(false);
  }, [fetchData, videoData]);

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
