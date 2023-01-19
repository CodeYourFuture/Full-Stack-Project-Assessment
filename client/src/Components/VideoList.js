import React from 'react'

function VideoList( {videos}) {
  
   return videos.map((video) => {
     return <video key={video.id}/>;
   });
}

export default VideoList
