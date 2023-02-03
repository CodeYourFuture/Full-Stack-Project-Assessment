import React from 'react'
import VideoCardButtons from './VideoCardButtons'
import Embeded from './Embeded'

const VideoCard = ({ videos, setVideos }) => {
  const removeVideo = (id) => {
    const updatedResponse = videos.filter((video) => video.id !== id)
    setVideos(updatedResponse)
  }

  return (
    <div className="card-container">
      {videos.map((video) => (
        <div className="video-card" key={video.id}>
          <h4>{video.video_title}</h4>
          <Embeded url={video.video_url} />
          <VideoCardButtons
            rating={video.video_rating}
            id={video.id}
            removeVideo={removeVideo}
          />
        </div>
      ))}
    </div>
  )
}

export default VideoCard
