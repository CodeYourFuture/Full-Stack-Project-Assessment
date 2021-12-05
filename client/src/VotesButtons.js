import React, { useState } from "react";
import data from "./exampleresponse.json";

const VotesButtons = (props) => {
  // states of votes buttons
  const [votes, setVotes] = useState(props.rating);
  const upVote = (event) => setVotes(votes + 1);
  const downVote = (event) => setVotes(votes - 1);

  // states of delete button
//   const [videos, setVideos] = useState(data);
  function handleDelete(id) {
    const remainingVideos = props.videos.filter((video) => video.id !== id);
    props.setVideos(remainingVideos);
  }

  return (
    <div>
      <button onClick={upVote} className="m-2 btn btn-sm btn-success">
        +
      </button>
      <span className="m-2 p-2 badge bg-primary">{votes}</span>
      <button onClick={downVote} className="m-2 btn btn-sm btn-warning">
        -
      </button>
      <button onClick={()=>handleDelete(props.id)} className="m-2 btn btn-sm btn-danger">
        Delete
      </button>
    </div>
  );
};

export default VotesButtons;
