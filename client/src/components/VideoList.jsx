import React, { useState } from 'react'
import VideoCard from './VideoCard'
import AddVideo from './AddVideo'
import data from '../data/exampleresponse.json'

const VideoList = () => {
  const [videos, setVideos] = useState(data)
  const removeHandler = (id) => {
    setVideos(videos.filter((video) => video.id !== id))
  }
  return (
    <>
      <AddVideo setVideos={setVideos} videos={videos}/>
      <div className="root">
        {videos.map((video, index) => (
          <VideoCard videoData={video} removeHandler={removeHandler} key={index}/>
        ))}

      </div>
    </>
  )
}

export default VideoList
