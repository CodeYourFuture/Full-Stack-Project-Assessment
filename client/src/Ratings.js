import React from 'react';


const Ratings = (props) => {
  
  return (
    <div>
      <button className="ratingBtn">{props.video.rating + props.upVote + props.downVote}</button>
    </div>
  );
};

export default Ratings;
