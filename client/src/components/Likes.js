import React, { useState } from 'react'
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';

const Likes = () => {

    const [count, setCount] = useState(0);
    const [count2, setCount2] = useState(0);

    const handleLike = () => {
        setCount(prevCount => prevCount + 1);
    };

    const handleDislike = () => {
        setCount2(prevCount => prevCount + 1);
    };

    return (
        <div className="card-bottom">
            <ThumbUpAltIcon onClick={handleLike} />
            <p className="counter-color-pos">{count}</p>
            <ThumbDownIcon onClick={handleDislike} />
            <p className="counter-color-neg">{count2}</p>
        </div>
    )
}

export default Likes;
