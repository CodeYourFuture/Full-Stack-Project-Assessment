import React from "react";

function VideoCard(props) {
  const handleRemoveVideo = (e) => {
    props.remover(props.video.id);
  };

  const handleUpVote = (e) => {
    props.addVote(props.video.id, props.video.rating);
  };

  const handleDownVote = (e) => {
    // props.remover(props.video.id);
  };

  return (
    <div className="video-card">
      <div className="card-body">
        <div className="votes-section">
          <div className="up-votes">
            <button className="vote-buttons" onClick={handleUpVote}>
              Vote Up:
            </button>
            <div className="vote-counter">{props.video.rating}</div>
          </div>
          <div className="down-votes">
            <button className="vote-buttons" onClick={handleDownVote}>
              Vote Down:
            </button>
            <div className="vote-counter">{props.video.rating}</div>
          </div>
          <button onClick={handleRemoveVideo}>Remove Video</button>
        </div>
      </div>
      <iframe
        src={props.video.url
          .replace("watch?v=", "embed/")
          .replace(".be/", "be.com/embed/")}
        title={props.video.title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        width="560"
        height="315"
        frameBorder="0"
      ></iframe>
      <h3 className="card-title">{props.video.title}</h3>
    </div>
  );
}

export default VideoCard;
