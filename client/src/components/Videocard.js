import React from "react";
function Videocard (props) {
    const videoId = props.link;
    const modifiedVideoId = videoId.replace("https://www.youtube.com/watch?v=", "")
return (
    <div>
    <h1>{props.name}</h1>
    <p>{props.link}</p>
    <iframe width="560" height="315" src= "https://www.youtube.com/embed/{modifiedVideoId}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    <p>Rating: {props.rating}</p>
    </div>
)
}
export default Videocard;