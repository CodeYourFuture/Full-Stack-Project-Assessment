import React from "react";

function EmbeddingVideo(props){
    const filmSrc=props.url.replace("watch?v=", "embed/");

    return(
        <div>
            <iframe 
            width="560" height="315" 
            src={filmSrc}
            title={props.title} 
            allow="accelerometer; fullscreen;autoplay" >
            </iframe>
        </div>
    )
}

export default EmbeddingVideo;