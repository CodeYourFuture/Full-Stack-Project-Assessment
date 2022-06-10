import React, { useState } from 'react'

// const VideoCard = ({ videoData, removeHandler }) => {
const VideoCard = ({ key, videoData, updateRating, deleteHandler }) => {
  const [rate, setRate] = useState(videoData.rating)
  console.log(videoData)
  let codeRequired = videoData.url.split('=')[1]
  let srcLink = `https://www.youtube.com/embed/${codeRequired}`
  
  const likeClick = () => {
    updateRating(videoData.id, rate + 1)
    setRate(rate + 1)
  }
  const dislikeClick = () => {
    updateRating(videoData.id, rate - 1)
    setRate(rate - 1)
  }
  return (
    <div key={key} className="card">
      <p className="id">{videoData.id}</p>
      <div className="title">
        <h3>{videoData.title}</h3>
      </div>
      <iframe
        width="560"
        height="315"
        src={srcLink}
        title={videoData.title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      ></iframe>
      <div className="bottom-panel">
        <span>Rating: {rate}</span>
        <div className="like">
          <img
            src="https://img.icons8.com/external-kmg-design-glyph-kmg-design/32/000000/external-dislike-feedback-kmg-design-glyph-kmg-design.png"
            alt="DisLike"
            onClick={dislikeClick}
          />
          <img
            src="https://img.icons8.com/external-kmg-design-glyph-kmg-design/32/000000/external-like-feedback-kmg-design-glyph-kmg-design.png"
            alt="Like"
            onClick={likeClick}
          />
        </div>
        <button
          className="btn btn-danger"
          onClick={() => {
            deleteHandler(videoData.id)
          }}
        >
          DELETE
        </button>
      </div>
    </div>
  )
}

export default VideoCard
