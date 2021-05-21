import {React, useState} from 'react';
import { FaThumbsUp, FaThumbsDown} from "react-icons/fa";
const VoteCount = (props) => {
    const handleUpVoteCount = props.handleUpVoteCount;
        return(
        <div className = "voteCounts">
         <button onClick = {handleUpVoteCount}  className = "upVotes" ><FaThumbsUp className = "classIcon"/></button>
         <h4>{props.upDownVoteCount} votes</h4>
         <button className = "downVotes"><FaThumbsDown className = "classIcon"/></button>   
        </div>
    )
}

export default VoteCount;