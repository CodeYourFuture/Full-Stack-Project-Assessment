import React, { useState } from 'react'
import exampleResponse from '../exampleresponse.json'
import VideoCardButtons from './VideoCardButtons'
//import use state

const VideoCard = () => {

  return (
    <div className='card-container'>
      {exampleResponse.map((video, i) => (
        <div className="video-card" key={i}>
          <h4>{video.title}</h4>
          <h1>{video.url.slice(32, 43)}</h1>
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
        </div>
      ))}
    </div>
  )
}

export default VideoCard
