import React, { useState } from 'react'
import OrderButton from './OrderButton'

const AddVideo = ({ videos, setVideos }) => {
  const [newTitle, setTitle] = useState('')
  const [newUrl, setUrl] = useState('')

  const handleTitle = (e) => {
    setTitle(e.target.value)
  }

  const handleUrl = (e) => {
    setUrl(e.target.value)
  }

  const addVideo = () => {
    fetch('https://michellejanay-cyf-video-app.onrender.com/videos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: newTitle, url: newUrl }),
    })
      .then((res) => res.json())
      .then(setVideos(videos))
      .catch((err) => console.log(err))
  }

  return (
    <div>
      <div className="add-video-card">
        <form onSubmit={addVideo}>
          <label htmlFor="title">Title: </label>
          <input
            type="text"
            id="input-title"
            name="title"
            onChange={handleTitle}
            required
          />
          <label htmlFor="url">Url:</label>
          <input
            type="text"
            id="input-url"
            name="url"
            onChange={handleUrl}
            required
          />
          <button className="btn">Submit</button>
        </form>
        <OrderButton videos={videos} setVideos={setVideos} />
      </div>
    </div>
  )
}

export default AddVideo
