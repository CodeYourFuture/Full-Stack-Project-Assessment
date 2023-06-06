import React, {useState} from "react";
import {FaThumbsUp, FaThumbsDown} from "react-icons/fa";

function Voting ({rating, onUpdateRating}) {
    const [vote, setVote] = useState(rating);

    const handleClickUpVote = () => {
        const newRating = vote +1;
        setVote(newRating);
        onUpdateRating(newRating);
    }

    const handleClickDownVote = () => {
        let newRating = 0;
        vote > 0 ? (newRating = vote -1) : (newRating = 0);
        setVote(newRating);
        onUpdateRating(newRating);
    };
    return (
        <div>
            <button><FaThumbsUp onClick={handleClickUpVote} /></button>
            <p>Vote</p>
            <button><FaThumbsDown onClick={handleClickDownVote} /></button>
        </div>
        
    );
}

export default Voting;