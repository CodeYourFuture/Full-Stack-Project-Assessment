import React from "react";

const YouTubeVideos = (props) => {
  return (
    <>
      {props.YouTubeData.map((elem, index) => (
        <div key={index}>
          <h3>{elem.title}</h3>
          <div id="voting">
              <i className="fa fa-thumbs-up fa-1x"></i>
              <h5>{elem.rating} votes</h5>
              <i className="fa fa-thumbs-down fa-1x"></i>
          </div>
          <iframe
            width="560"
            height="315"
            // original url would not work, need to use "embed/" to display video
            src={elem.url.replace("watch?v=", "embed/")}
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
          ></iframe>
        </div>
      ))}
    </>
  );
};

export default YouTubeVideos;
