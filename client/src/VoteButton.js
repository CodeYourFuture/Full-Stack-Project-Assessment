import React, {useState} from "react";

const VoteButton = ({item}) =>{      
    const [vote, setVote] = useState(+item.rating)
    
    return (
      <div>
        <p>Rating: {vote}</p>
        <button onClick={() => setVote(vote + 1)}>Upvote</button>
        <button onClick={() => setVote(vote - 1)}>Downvote</button>
      </div>
    );
}

export default VoteButton;