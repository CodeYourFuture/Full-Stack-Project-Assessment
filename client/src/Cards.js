
import React from 'react'
import { BsFillHandThumbsUpFill, BsHandThumbsDownFill } from "react-icons/bs";




function Cards({videos, upVote, downVote}) {
  return (
    <div className='videos-container'>
      {
        videos.map((video)=>{
          return <div className='video'>
            <iframe src={video.url.replace("watch?v=","embed/")}></iframe>
            <h3>{video.title}</h3>
            <p>votes: {video.rating}</p>
            <div className='video-icons'>
              <BsFillHandThumbsUpFill onClick={()=> upVote(video.id)}/>
              <BsHandThumbsDownFill onClick={()=> downVote(video.id)}/>
            </div>
            <button>remove</button>
          </div>
        })
      }
    </div>
  )
}

export default Cards


    
   
      
  
