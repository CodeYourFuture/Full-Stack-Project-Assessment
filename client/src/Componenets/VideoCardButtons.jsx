import { useState } from "react";

const VideoCardButtons = ({ rating, removeVideo, id }) => {
  let [vote, setVote] = useState(rating);

  const upVote = () => {
    setVote(vote++);
    fetch(
      `https://michellejanay-cyf-video-app.onrender.com/videos/upvote/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": "token-value",
        },
        body: JSON.stringify({ id: id }),
      }
    )
      .then((res) => res.json())
      .then(setVote(vote))
      .catch((err) => err);
  };

  const downVote = () => {
    setVote(vote === 0 ? 0 : vote--);

    fetch(
      `https://michellejanay-cyf-video-app.onrender.com/videos/downvote/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": "token-value",
        },
        body: JSON.stringify({ id: id }),
      }
    )
      .then((res) => res.json())
      .then(setVote(vote))
      .catch((err) => err);
  };

  return (
    <div className="video-buttons">
      <span>{vote}</span>
      <i className="bi bi-hand-thumbs-up" onClick={upVote}></i>
      <i className="bi bi-hand-thumbs-down" onClick={downVote}></i>
      <button className="btn btn-delete" onClick={() => removeVideo(id)}>
        remove video
      </button>
    </div>
  );
};

export default VideoCardButtons;
