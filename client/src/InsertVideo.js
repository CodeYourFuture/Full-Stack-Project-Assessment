import React, { useState } from 'react'
import Delete from "./clickables/Delete";
import DownVote from './clickables/DownVote';
import UpVote from './clickables/UpVote';

export default function InsertVideo({video}) {
    const src = video.url.replace("watch?v=", "embed/")
    let voteScore = 2;
    let [likes, setLikes] = useState(voteScore);

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
      <h4>{video.title}</h4>
      <div className="liking">
        <button onClick={handleLikeClick}>UpVote</button>
        {/* <UpVote onClick={handleLikeClick}/> */}
        <p>{`${likes}`} Votes</p>
        <button onClick={handleDislikeClick}>DownVote</button>
        {/* <DownVote onClick={handleDislikeClick}/> */}
      </div>
      <iframe src={src} title="YT video" allowFullScreen></iframe>
      <div>
        <Delete />
      </div>
    </div>
  );
}
