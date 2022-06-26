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

  async function removeVideo(id) { 
    await deleteVideo(id)
    
    getVideoData().then(videos => {
      setVideoList(videos);
    })
  }

  async function createVideo(videoObj) {
    await insertVideo(videoObj);
    getVideoData()
    .then((videos) => {
       setVideoList(videos);
    })
    .catch((error) => console.log(error));
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