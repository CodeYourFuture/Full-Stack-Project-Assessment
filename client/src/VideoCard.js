import React, { useState } from "react";
import { FaHeartbeat } from "react-icons/fa";
import { MdMusicOff } from "react-icons/md";
import { BsCalculator } from "react-icons/bs";
import { FaBalanceScale } from "react-icons/fa";
;

function VideoCard(props) {
  //states for number of upvotes/downvotes - decided to keep the scores separate rather than overall score
  const [upVote, setUpVote] = useState(0);
  const [downVote, setDownVote] = useState(0);
  const [totalVotes, setTotalVotes] = useState(0);
  const [balanceVotes, setBalanceVotes] = useState(0);

  //function to increase upVotes counter
  const upVoter = () => {
    console.log(upVote);
    setUpVote((upVote) => upVote + 1);
    setTotalVotes((totalVotes) => totalVotes + 1);
    setBalanceVotes((balanceVotes) => balanceVotes + 1);
  };

  //function to decrease downVotes counter
  const downVoter = () => {
    setDownVote((downVote) => downVote - 1);
    setTotalVotes((totalVotes) => totalVotes + 1);
    setBalanceVotes((balanceVotes) => balanceVotes - 1);
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
              <FaHeartbeat />
              ...Vote Up:
            </button>
            <div className="vote-counter">{upVote}</div>
          </div>
          <div className="down-votes">
            <button className="vote-buttons" onClick={downVoter}>
              <MdMusicOff /> ...Vote Down:
            </button>
            <div className="vote-counter">{downVote}</div>
          </div>
          <div className="total-votes">
            <button className="vote-buttons">
              <BsCalculator /> ...Total Votes:
            </button>
            <div className="vote-counter">{totalVotes}</div>
          </div>
          <div className="score-votes">
            <button className="vote-buttons">
              <FaBalanceScale /> ...Balanced Score
            </button>
            <div className="vote-counter">{balanceVotes}</div>
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
