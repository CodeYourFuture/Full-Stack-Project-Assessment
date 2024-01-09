import React, { useEffect, useState } from "react";
import CardsContainer from "./CardsContainer";
import VideoForm from "./VideoForm";
import { baseUrl } from "../config";

function MainContainer() {
  const [loading, setLoading] = useState(true);
  const [videoData, setVideoData] = useState();
  const [videoAdded, setVideoAdded] = useState(false);

  useEffect(() => {
    fetch(`${baseUrl}/videos`)
      .then((response) => response.json())
      .then((data) => {
        setVideoData(data);
        setLoading(false); // set setLoading to false after data is fetched
        setVideoAdded(false);
      })
      .catch((error) => {
        console.log("Error fetching data:", error); // log any errors
      });
  }, [videoAdded]);

  return (
    <div>
      <VideoForm videoData={videoData} setVideoAdded={setVideoAdded} />

      {loading ? (
        <div className="flex items-center justify-center text-center  text-lg sm:text-4xl xl:m-9 xl:p-9 xl:text-5xl ">
          <h2>
            This page is loading... Waiting for the server to wake up... 😊
          </h2>
          <div className="mx-9 h-12 w-12 animate-spin rounded-full border-b-4 border-t-4 border-gray-600"></div>
        </div>
      ) : (
        <CardsContainer videoData={videoData} setVideoData={setVideoData} />
      )}
    </div>
  );
}

export default MainContainer;
