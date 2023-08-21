import React, {useState, useEffect} from "react";
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
  const [deleteId, setDeleteId] = useState(0);

  useEffect(() => {
    console.log(deleteId);
    setVideoData(
      videoData.filter((video) => {
        return video.id !== deleteId
      })
    )
    /*
  - Get deleteId - DONE!
  - Filter out the videoData object with the same id as deleteID
  - Celebrate with a chocy
  */
  }, [deleteId]);

  return (
    <div>
      {videoData.map((video) => {
        return <VideoCard key={video.id} videoData={video} setDeleteId={setDeleteId} />;
      })}
    </div>
  );
}

export default CardsContainer;
