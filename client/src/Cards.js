
import React from 'react'
import { FaRegThumbsUp, FaRegThumbsDown } from "react-icons/fa";




function Cards({videos, upVote, downVote, deleteVideo}) {
  return (
    <div className='videos-container'>
      {
        videos.map((video)=>{
          return (
            <div className="video">
              <iframe src={video.url.replace("watch?v=", "embed/")}></iframe>
              <h3>{video.title}</h3>
              <p>votes: {video.rating}</p>
              <div className="video-icons">
                <FaRegThumbsUp onClick={() => upVote(video.id)} />
                <FaRegThumbsDown
                  className="downVote"
                  onClick={() => downVote(video.id)}
                />
              </div>
              <div className="remove-container">
                <button
                  onClick={() => {
                    deleteVideo(video.id);
                  }}
                >
                  remove
                </button>
              </div>
            </div>
          );
        })
      }
    </div>
  )
}

export default Cards;


    
   
      
  
