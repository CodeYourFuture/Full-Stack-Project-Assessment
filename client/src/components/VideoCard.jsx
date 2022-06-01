import React, { useState } from 'react';

const VideoCard = ({ videoData, removeHandler }) => {
  const [rate, setRate] = useState(videoData.rating)
  const addRate = () => {
    setRate(rate + 1)
  }
  const subRate = () => setRate(rate - 1)
  return (
    <div className="card">
      <p className="id">{videoData.id}</p>
      <div className='title'><h3>{videoData.title}</h3></div>
      <iframe
        width="560"
        height="315"
        src={`https://www.youtube.com/embed/${videoData.url.slice(
          videoData.url.indexOf('=') + 1,
        )}`}
        title={videoData.title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      ></iframe>
      <div className="bottom-panel">
        <span>Rating: {rate}</span>
        <div className="like">
          <img
            src="https://img.icons8.com/external-kmg-design-glyph-kmg-design/32/000000/external-dislike-feedback-kmg-design-glyph-kmg-design.png"
            alt='DisLike' 
            onClick={() => {
              subRate()
            }}
          />
          <img
            src="https://img.icons8.com/external-kmg-design-glyph-kmg-design/32/000000/external-like-feedback-kmg-design-glyph-kmg-design.png"
            alt='Like' 
            onClick={() => {
              addRate()
            }}
          />
        </div>
        <button onClick={()=>removeHandler(videoData.id)}>Remove</button>
      </div>
    </div>
  )
}


export default VideoCard