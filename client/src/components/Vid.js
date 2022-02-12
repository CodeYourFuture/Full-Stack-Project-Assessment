import React from 'react';
//import Button from './Button';
import { FaThumbsUp, FaThumbsDown } from 'react-icons/fa';
import { useState } from 'react';

const Vid = ({ videos, deleteVideo }) => {
 const [rating, setRating] = useState(videos.rating);

const thumbsUp = () => {
  setRating(item => item + 1);
};

const thumbsDown = () => {
  setRating(item => item === 0 ? item = 0 : item - 1);
};

const deleteVid = () => {
  deleteVideo(videos.id);
}

const videoUrl = videos.url.split("=").pop();

  return (
    <>
  <div className='Card m-3 p-2 vidSize'>
    <div>
      <h1 className="h1 card-title d-flex flex-column">{videos.title}</h1>
    </div>
    <div>
      <iframe className='max-width: 100%' width="100%" height="315" src={`https://www.youtube.com/embed/${videoUrl}`} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    </div>
    <div>
      <p className='pt-3 pb-3'><FaThumbsUp className='mr-2 thumbs' style={{color: 'blue', cursor: 'pointer'}} onClick={i => {i.stopPropagation(); thumbsUp();}}/> rating: {rating} <FaThumbsDown className='ml-2 thumbs' style={{color: 'red', cursor: 'pointer'}} onClick={i => {i.stopPropagation(); thumbsDown();}}/></p>
      <button className="button" onClick={deleteVid}>Delete</button>
    </div>
  </div>
  </>
  )
};
//btn btn-primary 
//<iframe width="560" height="315" src="https://www.youtube.com/embed/kBG-RnZU2cQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

export default Vid;

