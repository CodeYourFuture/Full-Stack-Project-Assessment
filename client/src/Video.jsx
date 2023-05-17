import React, { useState } from 'react';
import { AiFillLike,AiFillDislike,AiFillDelete } from 'react-icons/ai';

function Video({info, handleDelete}) {

  const [currentRating, setCurrentRating] = useState(info.rating);

  function handleDeleteBtn() {
    handleDelete(info.id);
  }

  function handleLike () {
    if(info.id)
    {setCurrentRating(currentRating + 1)}
  }

  function handleDislike () {
    if (info.id && currentRating > 0)
    {setCurrentRating(currentRating - 1)}
  }

  return (
    <div className='card'>
        <h1>
        {info.title}
        </h1>
        <iframe src={info.url}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Embedded youtube"
        >
        </iframe>
        <p>
        {currentRating}
        </p>
        <div className='groupBtn'>
        <button class="btn btn-success" onClick={handleLike}>
            <AiFillLike size={40}/>
        </button>
        <button class="btn btn-warning" onClick={handleDislike}>
            <AiFillDislike size={40}/>
        </button>
        <button class="btn btn-danger" onClick={handleDeleteBtn}>
            <AiFillDelete size={40}/>
        </button>
        </div>
    </div>
  )
}
export default Video