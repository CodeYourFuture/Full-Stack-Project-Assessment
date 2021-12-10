import React, { useState } from "react";


const Likes = (props) => {
    // const [liked, setLiked] = useState(false);
    const [initLike, setInitLike] = useState(props.likes);
    function handleVoteUp() {
        // console.log(initLike);
        setInitLike(initLike + 1);
    }
    function handleVoteDown() {
        // console.log(initLike);
        setInitLike((val) => {
            return val - 1;
        })
    }
    return (
        <>
            <h4> Votes: {initLike}</h4>
            <button type="button" className="like" onClick={handleVoteUp}>Vote up</button>
            <button type="button" className="dislike" onClick={handleVoteDown}>Vote down</button>
        </>
    )

}

export default Likes;


