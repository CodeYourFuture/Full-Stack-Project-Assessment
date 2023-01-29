import React, { useState } from 'react'
// import Delete from "./clickables/Delete";
// import DownVote from './clickables/DownVote';
// import UpVote from './clickables/UpVote';

export default function InsertVideo({video}) {
    const src = video.url.replace("watch?v=", "embed/")
    
    let [likes, setLikes] = useState(video.rating);

    function handleLikeClick(){
      setLikes(likes + 1);
    }

    function handleDislikeClick(){
      if(likes >= 1){
        setLikes(likes - 1);

      }
    }
  return (
    <div className="inserted-video">
      <h3>{video.title}</h3>
      <div className="liking">
        <button className='up-vote' onClick={handleLikeClick}>👍</button>
        <p>{`${likes}`} Votes</p>
        <button className='down-vote' onClick={handleDislikeClick}>👎</button>
      </div>
      <iframe
        width="460"
        height="315"
        src={src}
        title="YT video Player"
        // Border="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
      
    </div>
  );
}
