import React, { useState, useEffect } from 'react'
import VideoCard from './VideoCard'
import AddVideo from './AddVideo'
// import data from '../data/exampleresponse.json'

const VideoList = () => {
  const [videos, setVideos] = useState([])
  const removeHandler = (id) => {
    // setVideos(videos.filter((video) => video.id !== id))
    fetch(`http://localhost:5000/videos/${id}`, {method : 'DELETE'})
    .then(res => res.json())
    .then(data => console.log(data))
  }
    
  
  useEffect(() => {
    async function reload() {fetch('http://localhost:5000/videos')
    .then(res => res.json())
    .then(data => setVideos(data))}
    reload();
  },[videos])
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
