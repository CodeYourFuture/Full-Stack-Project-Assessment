import React, { useState } from 'react';
import VideoCard from './VideoCard';
import data from '../data/exampleresponse.json'

const VideoList = () => {
  const [videos, setVideos] = useState(data)
  const removeHandler = (id) => {
    setVideos(videos.filter(video => video.id !== id))
  }
    return (
        <>
        {videos.map((video) => 
            <VideoCard videoData={video} removeHandler={removeHandler}/>  )}
        </> 
     );
}

 
export default VideoList;
