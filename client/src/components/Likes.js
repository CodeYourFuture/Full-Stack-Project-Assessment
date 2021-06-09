import React, { useState } from 'react'
import './Likes.css';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import DeleteForeverSharpIcon from '@material-ui/icons/DeleteForeverSharp';


const Likes = (props) => {

    const [count, setCount] = useState(props.rating);
    // const [count2, setCount2] = useState(0);

    const handleLike = () => {
        setCount(prevCount => prevCount + 1);
    };

    const handleDislike = () => {
        setCount(prevCount => prevCount - 1);
    };

    return (
        <div className="card-bottom">
            <DeleteForeverSharpIcon
                fontSize="large" className='icon' onClick={props.clicked} />


            <ThumbUpAltIcon onClick={handleLike} className='icon' />
            <p className="counter-color-pos">{count}</p>
            <ThumbDownIcon onClick={handleDislike} className='icon' />
        </div>

    )
}

export default Likes;
