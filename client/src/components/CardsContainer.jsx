import React from "react";
import VideoCard from "./VideoCard";

// how to change a videoData to a useState variable
// send that down to VideoCard because it has the button to delete
/*
we have 2 choices to delete the particular VideoCard:
1. pass the full data down to delete a small part from the full data
2. instead of passing the full data down, we get the unique number of the card to delete it from the full data

We turn the videoData into a useState to delete the video with a specific data.
How do you delete a record from a useState array (answer might be spread operator, perhaps .map?)
*/

function CardsContainer( { videoData, setVideoData }) {

function handleDelete(id) {
  setVideoData(
    videoData.filter((video) => {
      return video.id !== id;
    })
  );
}

  return (
    <div className="grid justify-center gap-9">
      {videoData.sort((a, b) => b.rating - a.rating).map((singleVideo) => {
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
