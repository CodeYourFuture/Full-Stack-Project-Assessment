import React, { useState } from "react";
import {FcLike} from "react-icons/fc"; 
import {FcDislike} from "react-icons/fc"; 

function LikeDislike() {
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);

  return (
    <div className="like-dislike-btn-container">
      <div className="btn-wrapper">
      <button className="button"  onClick={() => setLikes(likes + 1)}><FcLike /> {likes}</button>
      <button className ="button" onClick={() => setDislikes(dislikes + 1)}><FcDislike /> {dislikes}</button>
      </div> 
    </div>
  );
}

export default LikeDislike;
