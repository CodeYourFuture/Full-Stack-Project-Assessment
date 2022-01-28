import React from "react";

function VideoCard(props) {
  return (
    <div className="video-card">
      <div className="card-body">
        <h5 className="card-title">{props.video.title}</h5>
        <button>UpVote</button>
        <div>0 Votes</div>
        <button>DownVote</button>
      </div>
      <iframe
        src={props.video.url}
        title={props.video.title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        height="300"
        width="400"
        marginHeight="40"
        frameBorder="0"
      ></iframe>
      <div>
        <button>Remove</button>
      </div>
    </div>
  );
}

export default VideoCard;
