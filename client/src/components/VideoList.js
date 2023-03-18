import React from 'react'
import data from "./exampleresponse.json"

const VideoList = () => {


  return (
    <div>
      {data.map(data =>data.title)}

    </div>
  )
}

export default VideoList