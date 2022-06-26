import React, { useState, useEffect } from "react";
import Video from "./Videos";
import VoteButtons from "./VoteButtons";
import AddVideo from "./AddVideo";
import { getVideoData, deleteVideo, insertVideo } from "../service/videoService";

function VideoCards() {
  const [videoList, setVideoList] = useState([{}]);

  useEffect(() => {
    getVideoData().then((videos) => {
      setVideoList(videos);
    });
  }, []);

  function removeVideo(id) {
    deleteVideo(id);
  }

 async function createVideo(videoObj) {
     await insertVideo(videoObj)
  }

  if(videoList) {
    return (
      <div className="video-cards">
        <AddVideo createVideo={createVideo} />
        <div className="cards">
          {videoList.map((videoObj, index) => {
            return (
              <div className="card-container" key={index}>
                <div className="card-title">
                  <h2>{videoObj.title}</h2>
                </div>

                <Video
                  videoObj={videoObj}
                  removeVideo={() => {
                    removeVideo(videoObj.id);
                  }}
                />

                <VoteButtons />
              </div>
            );
          })}
        </div>
      </div>
    );
  } else {
    return (<div>
      </div>)
  }
}
export default VideoCards;