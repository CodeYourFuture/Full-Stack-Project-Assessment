import {React, useState} from 'react';
import LikeDislike from '../LikeDiskike/likeDislike';
import './singleVid.css'



function SingleVid({id, title, url, ratingFromData, removeVideo}) {
    const [rating, setRating] = useState(ratingFromData);
    function handleIncrement() {
        setRating((prev) => prev + 1)
    }
    function handleDecrement() {
        if (rating !== 0) {
            setRating((prev) => prev - 1)
        }
        
    }
  return (
        <div key={id} className="single-vid">
            <p>{title}</p>
            <LikeDislike handleIncrement={handleIncrement} handleDecrement={handleDecrement} rating={rating}/>
            <iframe width="560" height="315" src={url} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
            <button onClick={() => removeVideo(id)}>Delete</button>
        </div>
            
        
    
  )
}

export default SingleVid