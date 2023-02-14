import React from 'react'
import videos from "../data/exampleresponse.json"

const VideoList = () => {


  return (
    <div>
     {videos.map(video => <div><h2>{video.title}
     </h2>
     <iframe width="560" height="315" src={video.url.replace("watch?v=", "embed/")} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div> )}
     
    </div>
  )
}

export default VideoList