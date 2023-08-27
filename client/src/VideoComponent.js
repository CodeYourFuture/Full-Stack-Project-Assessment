import React, { useState } from "react";
// className = "video";

const VideoComponent = ({ video, onRemove }) => {
  const [votes, setVotes] = useState(0);

  // function handleRemove () {

  // }

  return (
    <>
      {/* <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-8"> */}
      <h1 className="text-center">{video.title}</h1>
      {/* <div className="embed-responsive embed-responsive-16by9"> */}
      <video className="embed-responsive-item" controls>
        <source src={video.url} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <p>Votes {votes}</p>

      <button onClick={() => onRemove(video.id)}>Remove Video</button>

      {/* <button onClick={handleVotes}>

      </button> */}

      {/* <iframe
        width="560"
        height="315"
        src="https://www.youtube.com/watch?v=qSCdXiNSfeA"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe> */}

      {/* </div>
          </div>
        </div>
      </div> */}
    </>
  );
};

export default VideoComponent;
