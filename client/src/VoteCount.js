import React, { useState } from "react";


const VoteCount = () => {
    const [count, setCount] = useState(0);
    const likeNum = () => {
        setCount(count + 1);
    }
    const unlikeNum = () => {
        setCount(count - 1)
    }
    return <div className="icons">
        <i onClick={likeNum} className="far fa-thumbs-up"></i>
        <p className="vote" >{count} Votes</p>
        <i onClick={unlikeNum} className="far fa-thumbs-down"></i>
    </div> 
}

export default VoteCount;