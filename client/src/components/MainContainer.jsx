import React, { useEffect, useState } from "react";
import CardsContainer from "./CardsContainer";
import VideoForm from "./VideoForm";
import { baseUrl } from "../config";

function MainContainer() {
  const [loading, setLoading] = useState(true);
  const [videoData, setVideoData] = useState();
  const [fetchData, setFetchData] = useState(true);

  useEffect(() => {
    setLoading(true); // set setLoading to true before fetching data
    if (fetchData) {
      fetch(`${baseUrl}/videos`) // prod
        .then((response) => response.json())
        .then((data) => {
          setVideoData(data);
          setLoading(false); // set setLoading to false after data is fetched
        })
        .catch((error) => {
          console.log("Error fetching data:", error); // log any errors
        });
    }
    setFetchData(false);
  }, [fetchData]);

  return (
    <div>
      <VideoForm
        setFetchData={setFetchData}
        videoData={videoData}
        setVideoData={setVideoData}
      />
      {loading ? (
        <div className="justify-center text-center flex items-center  text-lg sm:text-4xl xl:m-9 xl:p-9 xl:text-5xl ">
          <h2>Page loading...</h2>
          <div className="h-12 w-12 animate-spin rounded-full border-b-4 border-t-4 border-gray-600 mx-9"></div>
        </div>
      ) : (
        <CardsContainer
          setFetchData={setFetchData}
          videoData={videoData}
          setVideoData={setVideoData}
        />
      )}
    </div>
  );
}

export default MainContainer;
