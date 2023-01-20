import React, { useState } from 'react'

import Videocart from './Videocart'
import dataVideos from "/Users/nagehan/Documents/Full-Stack-Project-Assessment/client/src/exampleresponse.json"



function Main() {
const[videos,setVideos]=useState(dataVideos)
console.log(videos)

    return (

    <div>
        {videos.map(video=>(
            <div>
                <Videocart video={video} data={setVideos} videos={videos}/>
              
                </div>
        ))}

    </div>
  )
}

export default Main