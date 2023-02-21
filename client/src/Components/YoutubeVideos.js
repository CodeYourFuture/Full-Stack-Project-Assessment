import React from "react";


function YoutubeVideos(props) {
    return(
<div className="video-container">

<div className="video-item">
<p>{props.title}</p>

<iframe src={props.link} 
title="YouTube video player" 
frameborder="0" 
allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
allowfullscreen
width="560" height="315">
</iframe>

<h3> Rating: {props.rating}</h3>
</div>

</div>
    );
}

export default YoutubeVideos;

