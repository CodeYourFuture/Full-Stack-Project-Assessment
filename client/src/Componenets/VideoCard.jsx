import React, { useState } from 'react'
import exampleResponse from '../exampleresponse.json'
import VideoCardButtons from './VideoCardButtons'
//import use state

const VideoCard = () => {

  return (
    <div>
      {exampleResponse.map((video, i) => (
        <div className="video-card" key={i}>
          <h3>{video.title}</h3>
          <iframe
            width="560"
            height="315"
            src={`https://www.youtube.com/embed/${video.id}`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
          <VideoCardButtons rating={video.rating} />
        </div>
      ))}
    </div>
  )
}

export default VideoCard
