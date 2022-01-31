import React, { useState } from "react";

function VideoCard(props) {
  //states for number of upvotes/downvotes - decided to keep the scores separate rather than overall score
  const [upVote, setUpVote] = useState(0);
  const [downVote, setDownVote] = useState(0);
  const [totalVotes, setTotalVotes] = useState(0);

  //function to increase upVotes counter
  const upVoter = () => {
    console.log(upVote);
    setUpVote((upVote) => upVote + 1);
    setTotalVotes((totalVotes) => totalVotes + 1);
  };

  //function to decrease downVotes counter
  const downVoter = () => {
    setDownVote((downVote) => downVote - 1);
    setTotalVotes((totalVotes) => totalVotes + 1);
  };

  //add aggregate vote function & calculator to display

  const handleRemoveVideo = (e) => {
    props.remover(props.video.id);
  };

  return (
    <div className="video-card">
      <div className="card-body">
        <div className="votes-section">
          <div className="up-votes">
            <button className="vote-buttons" onClick={upVoter}>
              Vote Up:
            </button>
            <div className="vote-counter">{upVote}</div>
          </div>
          <div className="down-votes">
            <button className="vote-buttons" onClick={downVoter}>
              Vote Down:
            </button>
            <div className="vote-counter">{downVote}</div>
          </div>
          <div className="down-votes">
            <button className="vote-buttons">Total Votes:</button>
            <div className="vote-counter">{totalVotes}</div>
          </div>
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
      <button onClick={handleRemoveVideo}>Remove Video</button>
      <h3 className="card-title">{props.video.title}</h3>
    </div>
  );
}

export default VideoCard;
