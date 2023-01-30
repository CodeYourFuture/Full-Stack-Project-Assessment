
import React from 'react'



function Cards({videos}) {
  return (
    <div>
      {
        videos.map((video)=>{
          return <div>
            <iframe src={video.url.replace("watch?v=","embed/")}></iframe>
            <h3>{video.title}</h3>
          </div>
        })
      }
    </div>
  )
}

export default Cards


    
   
      
  
