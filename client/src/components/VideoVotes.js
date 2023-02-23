import React from "react";
import { useState } from "react";

export const VideoVotes = () => {

    const [votes, setVotes] = useState(0);
    const increaseVotes = () => {
        setVotes(votes + 1)
    }
    const decreaseVotes = () => {
        if (votes > 0) {
            setVotes(votes - 1)
        }
    };
    return (
        <div className="thumbs-icons">
            <i className="fa-regular fa-thumbs-up" onClick={increaseVotes}>  </i>
            <i className="fa-regular fa-thumbs-down" onClick={decreaseVotes}></i>
            <p>{votes}</p>
        </div>
    );
}
