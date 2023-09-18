import React from "react";
import VideoCard from "./VideoCard";
import { baseUrl } from "../config";

function CardsContainer({ videoData, setVideoData, setFetchData }) {
  async function handleDelete(id) {
    fetch(`${baseUrl}/videos/${id}`, {
      method: "delete",
    })
      .then((response) => response.json())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
    setFetchData(true);
  }

  return (
    <div className="grid grid-cols-1 gap-8 sm:mx-10 sm:my-3 sm:grid-cols-2 md:grid-cols-2 lg:mr-24 lg:grid-cols-3 xl:ml-24 xl:grid-cols-3 2xl:grid-cols-4">
      {videoData
        ?.sort((a, b) => b.rating - a.rating)
        .map((singleVideo) => {
          return (
            <VideoCard
              key={singleVideo.id}
              videoData={videoData}
              singleVideo={singleVideo}
              onDelete={handleDelete}
              setVideoData={setVideoData}
            />
          );
        })}
    </div>
  );
}

export default CardsContainer;
