import React from "react";

function EmbeddingVideo(props){
    console.log(typeof(props.url));
    let filmSrc=props.url.replace("watch?v=", "embed/");
    
  
    return(
        <div>
            <iframe 
            className="film"
            src={filmSrc}
            title={props.title} 
            allow="accelerometer; fullscreen;autoplay" >
            </iframe>
        </div>
    )
}

export default EmbeddingVideo;