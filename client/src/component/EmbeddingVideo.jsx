import React from "react";

function EmbeddingVideo(props){

    // let filmSrc=props.url.replace("watch?v=", "embed/");
     let filmSrc=props.url

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