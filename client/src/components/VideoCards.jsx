import React, {useState}from 'react'
import videosData from "../data/exampleresponse.json"
import Video from './Video'
import AddVideo from './AddVideo'


const VideoCards = () => {
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
      <AddVideo addVideo={addVideo} />
      {videoList.map((videoObj, index) => {
        return (
          /* video contents */
          <div className="card-container" key={index}>
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
            
          </div>
        );
      })}
    </div>
    
  )
}

export default VideoCards