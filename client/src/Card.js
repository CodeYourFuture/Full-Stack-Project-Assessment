import React, { useState } from "react";
import ButtonGenerator from "./ButtonGenerator";

const Card = ({ obj, index, onDelete }) => {
  const [rating, setRating] = useState(obj.rating);
  const embeddedVid = obj.url.replace('watch?v=', 'embed/');

  return (
    <div className="card" key={index}>
      <p>{obj.title}</p>
      <iframe width="400" height="250"
        src={embeddedVid}
        title={obj.title} frameBorder="0"
        allow="accelerometer; autoplay;
              clipboard-write; encrypted-media; gyroscope;
              picture-in-picture" allowFullScreen>
      </iframe>

      <div>
        <ButtonGenerator voteType={"Up Vote"}
          handleClick={() => { setRating(rating + 1) }} />
        <>{rating}</>
        <ButtonGenerator voteType={"Down Vote"}
          handleClick={() => { setRating(rating - 1) }} />
      </div>
      <button className="button"
        onClick={() => onDelete(obj.id)}>Delete</button>
    </div>
  )
}


export default Card;