import React from "react";


export default function DeletedVideo({ videoId, handleDeletedVideo }) {
                 // function handleDeletedVideo ( id){
                 //  const newVideoList = }
// console.log(videoId)
                 return (
                   <div>
                     <button onClick={() => {handleDeletedVideo(videoId)}} > DeleteVideo </button>
                   </div>
                 );
               }