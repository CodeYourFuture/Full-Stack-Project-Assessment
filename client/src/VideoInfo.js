import React from "react";

function VideoInfo(props) {
  return (
    <ul className="videoInfo">
      {
        <li key={props.movie.id}>
          <h4>{props.movie.title}</h4>
          <iframe
            width="100%"
            height="auto"
            src="https://www.youtube.com/embed/dQw4w9WgXcQ"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          ></iframe>
        </li>
      }
    </ul>
  );
}

export default VideoInfo;
