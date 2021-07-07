import React, { useState } from "react";
import IFrame from "./Iframe";

//rename array to something clearer
// destructuring

const Box = ({ id, title, rating: ratingProp, embed, array, setArray }) => {
  const [rating, setRating] = useState(ratingProp);
  const ratingUpperBound = ratingProp + 1;
  const ratingLowerBound = ratingProp - 1;

  return (
    <div className="box">
      Title: {title}
      <br></br>
      <IFrame embed={embed} />
      <br></br>
      ID: {id}
      <br></br>
      <button
        onClick={() => {
          rating >= ratingUpperBound
            ? setRating(rating - 1)
            : setRating(rating + 1);
        }}
      >
        👍
      </button>
      Rating: {rating}
      <button
        onClick={() => {
          rating <= ratingLowerBound
            ? setRating(rating + 1)
            : setRating(rating - 1);
        }}
      >
        👎
      </button>
      <br></br>
      <button onClick={() => setArray(array.filter((x) => x.id !== id))}>
        Delete
      </button>
    </div>
  );
};
export default Box;
