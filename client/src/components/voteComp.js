import React, { useState } from "react";
import { FaThumbsUp } from "react-icons/fa";
import { FaThumbsDown } from "react-icons/fa";

const VoteComp = ()=>{
    const [voteCounts, setVoteCounts] = useState(0)
    const voteIn = (e)=>{
      e.preventDefault();
        setVoteCounts(voteCounts + 1);
    }
    const voteOut = (e)=>{
      e.preventDefault();
        setVoteCounts(voteCounts - 1);
    }
    return (
      <div className="d-flex justify-content-around">
        <FaThumbsUp onClick={voteIn} />
        <h3>{voteCounts} VOTE</h3>
        <FaThumbsDown onClick={voteOut} />
      </div>
    );
}

export default VoteComp 
