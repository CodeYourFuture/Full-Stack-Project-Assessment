import React from 'react'
import exampleResponse from '../exampleresponse.json'

const VideoCard = () => {
  return (
    <div>
      <button>x</button>
      {exampleResponse.map((video) => (
        <div>
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
        </div>
      ))}

      {/* up vote, down vote icons */}
      <i class="bi bi-hand-thumbs-up"></i>
      <i class="bi bi-hand-thumbs-down"></i>
    </div>
  )
}

export default VideoCard
