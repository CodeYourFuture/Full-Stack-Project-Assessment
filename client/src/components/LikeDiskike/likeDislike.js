import React from 'react';
import {BsFillHandThumbsUpFill} from 'react-icons/bs';
import {BsHandThumbsDownFill} from 'react-icons/bs';
import './likeDislike.css'

function LikeDislike({rating, handleIncrement, handleDecrement }) {
  return (
    <div className='like-dislike'>
        <span 
            onClick={() => handleIncrement()}
            >
            < BsFillHandThumbsUpFill className='icon'/>
        </span>
        <h4>{rating}</h4>
        <span onClick={() => handleDecrement()}><BsHandThumbsDownFill className='icon'/></span>
    </div>
  )
}

export default LikeDislike