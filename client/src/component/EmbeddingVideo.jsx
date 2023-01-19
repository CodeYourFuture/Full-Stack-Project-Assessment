import React from "react";

function EmbeddingVideo(props){
    const filmSrc=props.url.replace("watch?v=", "embed/");

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