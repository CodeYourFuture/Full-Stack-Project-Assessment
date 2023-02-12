import React from "react";


export default function DeletedVideo({ videoId, handleDeletedVideo }) {
                 // function handleDeletedVideo ( id){
                 //  const newVideoList = }
 console.log(videoId)
                 return (
                   <div className="votingBtn">
                     <button
                       className="btn btn-dark"
                       onClick={() => {
                         handleDeletedVideo(videoId);
                       }}
                     >
                       {" "}
                       DeleteVideo{" "}
                     </button>
                   </div>
                 );
               }