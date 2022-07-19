import React, { useState } from 'react'
import axios from 'axios'
import Moment from 'react-moment';
const path = 'https://youtube-videos-list.herokuapp.com/'

const VideoCard = ({ videoId, videoData, deleteHandler }) => {
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
    <div key={videoId} className="card">
      <p className="id">VIDEO ID : {videoData.id}</p>
      <div className="title">
        <p>{videoData.title}</p>
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
        <div className='h6'>Rating: {rate}</div>
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
    <div className='mb-3 h6'>
    Posted <Moment date={videoData.post_date}
                    durationFromNow
                    /> ago
                    </div>
    </div>
  )
}

export default VideoCard
