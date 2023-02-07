import React, { useState } from "react";

export default function Voting({ videoRating }) {
                 console.log(videoRating);
                 const [like, setLike] = useState(videoRating);

                 function handleLike() {
                   setLike((count) => count + 1);
                 }

                 function handDislike() {
                   setLike((count) => count - 1);
                 }
                 return (
                   <div>
                     <button onClick={handleLike}> Like</button>
                     <p> Current Votes {like} </p>
                     <button onClick={handDislike}> Dislike </button>
                   </div>
                 );
               }
