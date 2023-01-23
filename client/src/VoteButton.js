import React from "react";

const VoteButton = ({item}) =>{
    return (
      <div>
        <button onClick={() => item.rating}>Upvote</button>
        <button onClick={() => item.rating}>Downvote</button>
      </div>
    );
}

export default VoteButton;