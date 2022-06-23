import React, { useState } from 'react'
import axios from 'axios'

const path = 'https://youtube-videos-list.herokuapp.com/'

const VideoCard = ({ key, videoData, deleteHandler }) => {
  const [rate, setRate] = useState(videoData.rating)
  let codeRequired = videoData.url.split('=')[1]
  let srcLink = `https://www.youtube.com/embed/${codeRequired}`

  const updateRating = (upDownRate) => {
    axios
      .put(`${path}${videoData.id}/rating`, {rating: rate + upDownRate})
      .then((res) => setRate(rate + upDownRate))
  }

  const likeClick = () => {
    updateRating(1)
  }
  const dislikeClick = () => {
    updateRating(-1)
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
        frameBorder="none"
        loading="lazy"
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
