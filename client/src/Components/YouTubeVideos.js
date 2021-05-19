import React from "react";
import DeleteVideo from "./DeleteVideo";
import Votes from "./Votes";

const YouTubeVideos = (props) => {
  return (
    <>
      {props.YouTubeData.map((elem, index) => (
        <div key={index}>
          <h3>{elem.title}</h3>
          <Votes elem={elem}/>
          <iframe
            width="560"
            height="315"
            // original url would not work, need to use "embed/" to display video
            src={elem.url.replace("watch?v=", "embed/")}
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
          ></iframe>
          <DeleteVideo />
        </div>
      ))}
    </>
  );
};

export default YouTubeVideos;
