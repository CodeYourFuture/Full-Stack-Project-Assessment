import React from 'react'
import exampleResponse from '../exampleresponse.json'
// import * as Icon from 'react-bootstrap-icons';
//import use state

const VideoCard = () => {
  return (
    <div>
      {exampleResponse.map((video) => (
        <div className="video-card">
          <h3>{video.title}</h3>
          <iframe
            width="560"
            height="315"
            src={`https://www.youtube.com/embed/${video.id}`}
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
          <div className="video-buttons">
            <span>0</span>
            <i className="bi bi-hand-thumbs-up"></i>
            <i className="bi bi-hand-thumbs-down"></i>
            <button>remove video</button>
          </div>
        </div>
      ))}
      {/* button to remove video */}
      {/* how many votes a video has */}
      {/* up vote, down vote icons */}
    </div>
  )
}

export default VideoCard
