import React, { useState } from "react";
import videosData from "./exampleresponse.json";
import Video from "./Videos";
import VoteButtons from "./VoteButtons";

function VideoCards() {
  const [videoList, setVideoList] = useState(videosData);
  
  /* remove any video by id */
  function removeVideo(id) {
    const updatedVideoList = videoList.filter((video) => video.id !== id);
    setVideoList(updatedVideoList);
  }

  return (
    <div className="video-cards">
      {videoList.map((videoObj, index) => {
        return (
          /* video contents */
          <div key={index} className="card-container">
            {/* video title */}
            <div className="card-title">
              <h3>{videoObj.title}</h3>
            </div>

            <Video
              /* embedded video */
              videoObj={videoObj}
              /* delete button */
              removeVideo={() => {
                removeVideo(videoObj.id);
              }}
            />

            {/* no of votes, up vote button, down vote button */}
            <VoteButtons />
          </div>
        );
      })}
    </div>
  );
}

export default VideoCards;