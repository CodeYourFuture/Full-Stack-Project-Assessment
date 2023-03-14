import react from "react";


function EmbedVideo({video}){
  let embedUrl =""
  if(video.url !== undefined){
    embedUrl = video.url.replace("watch?v=", "embed/")
 
  }


    return(
        <iframe
        src={embedUrl}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        width="560"
        height="315"
      ></iframe>
    )
  
}

export default EmbedVideo