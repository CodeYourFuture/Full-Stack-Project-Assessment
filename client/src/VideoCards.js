import React, { useState } from "react";
import videosData from "./exampleresponse.json";
import Video from "./Videos";
import VoteButtons from "./VoteButtons";
import AddVideo from "./AddVideo";

function VideoCards() {
  const [videoList, setVideoList] = useState(videosData);

  /* remove any video by id */
  function removeVideo(id) {
    const updatedVideoList = videoList.filter((video) => video.id !== id);
    setVideoList(updatedVideoList);
  }

  /* add any video to list */
  function addVideo(videoObj) {
    setVideoList(videoList.concat(videoObj));
  }

  return (
    <div className="video-cards">
      <AddVideo AddVideo={addVideo} />
      <div className="cards">
        {videoList.map((videoObj, index) => {
          return (
            /* video contents */
            <div className="card-container" key={index}>
              {/* video title */}
              <div className="card-title">
                <h2>{videoObj.title}</h2>
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
    </div>
  );
}
export default VideoCards;