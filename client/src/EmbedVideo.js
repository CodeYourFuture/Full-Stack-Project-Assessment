import React from "react";

function EmbedVideo({video}) {
const url = video.url.replace("watch?v=", "embed/");
 //console.log(url);
 return (
   <iframe
     width="560"
     height="315"
     src={url}
     title="YouTube video player"
     frameborder="0"
     allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
     allowfullscreen
   ></iframe>
 );
}
export default EmbedVideo;