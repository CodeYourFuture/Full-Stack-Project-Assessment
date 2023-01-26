import React, { useState } from 'react'
import exampleResponse from '../exampleresponse.json'
import VideoCardButtons from './VideoCardButtons'
//import use state

const VideoCard = () => {
  const [videos, setVideos] = useState(exampleResponse)

  const removeVideo = (id) => {
    console.log('clicked!')
    const updatedResponse = videos.filter((video) => video.id !== id)
    setVideos(updatedResponse)
  }

  return (
    <div className="card-container">
      {videos.map((video) => (
        <div className="video-card" key={video.id}>
          <h4>{video.title}</h4>
          <iframe
            width="560"
            height="315"
            src={`https://www.youtube.com/embed/${video.url.slice(32, 43)}`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
          <VideoCardButtons rating={video.rating} />
          <button onClick={() => removeVideo(video.id)}>remove video</button>
        </div>
      ))}
    </div>
  )
}

export default VideoCard
