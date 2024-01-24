import React, { useState } from "react";

export default function Voting({ videoRating }) {
                //  console.log(videoRating);
                 const [like, setLike] = useState(videoRating);

                 function handleLike() {
                   setLike((count) => count + 1);
                 }

                 function handDislike() {
                   setLike((count) => count - 1);
                 }
                 return (
                   <div className="votingBtn">
                     <button className="btn btn-dark" onClick={handleLike}>
                      
                       Like
                     </button>
                     <p> Current Votes {like} </p>
                     <button className="btn btn-dark" onClick={handDislike}>
                      
                       Dislike
                     </button>
                   </div>
                 );
               }
