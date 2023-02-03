import React, { useState } from 'react'
import uuid from 'react-uuid'
import OrderButton from './OrderButton'

const AddVideo = ({ videos, setVideos }) => {
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')

  const handleTitle = (e) => {
    setTitle(e.target.value)
  }

  const handleUrl = (e) => {
    setUrl(e.target.value)
  }

  const addToResponse = (e) => {
    e.preventDefault()
    const newVideo = {
      id: uuid(),
      video_title: title,
      video_url: url,
    }

    const videosPlus = videos.concat(newVideo)
    setVideos(videosPlus)
    // setVideos([...videos, newVideo])
  }

  return (
    <div>
      <div className="add-video-card">
        <form onSubmit={addToResponse}>
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
