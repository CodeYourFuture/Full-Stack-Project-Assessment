import React from "react";
import smileyFace from "./smiley-face.png";
import downVoteFace from "./downvote-face.png";

function Rating() {
  const [vote, setVote] = React.useState(0);

  const handleLike = () => {
    setVote((vote) => vote + 1);
  };

  const handleDislike = () => {
    setVote((vote) => (vote === 0 ? 0 : vote - 1));
  };
  return (
    <div className="votes">
      <div className="vote">
        <img
          onClick={handleDislike}
          src={downVoteFace}
          alt="down vote"
          className="face"
          id="dislike-face"
        />
        <div onClick={handleDislike}>down vote</div>
      </div>
      <h3 className="rating">{vote}</h3>
      <div className="vote">
        <img
          onClick={handleLike}
          src={smileyFace}
          alt="up vote"
          className="face"
          id="like-face"
        />
        <div onClick={handleLike}>up vote</div>
      </div>
    </div>
  );
}

export default Rating;
