import React, { useState } from 'react'
import Deletebutton from './Deletebutton'
import Videocart from './Videocart'
import dataVideos from "/Users/nagehan/Documents/Full-Stack-Project-Assessment/client/src/exampleresponse.json"



function Main() {
const[videos,Setvideos]=useState(dataVideos)
console.log(videos)

    return (

    <div>
        {videos.map(v=>(
            <div>
                <Videocart videos={videos} data={v}/>
                <Deletebutton videos={Setvideos} id={v.id} data={videos}/>
                </div>
        ))}

    </div>
  )
}

export default Main