import React from "react";
import { useState } from "react";

const VideoCard = (props) => {
  const [votes, setVotes] = useState(0);
  const [deleteVideo, setDeleteVideo] = useState(true);
  const increaseVotes = () => {
    setVotes(votes + 1);
  };
  const decreaseVotes = () => {
    if (votes > 0) {
      setVotes(votes - 1);
    }
  };
  let listThem = props.url.substring(32, 43);
  console.log(listThem);

  const deleteData = () => {
    setDeleteVideo(false);
  };
  return (
    <div className={deleteVideo ? "" : "d-none"}>
      <iframe
        width="560"
        height="315"
        src={`https://www.youtube.com/embed/${listThem}`}
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
      <div>
        <h2>Title</h2>
        <div className="thumbs-icons">
          <i class="fa-regular fa-thumbs-up" onClick={increaseVotes}></i>
          <i class="fa-regular fa-thumbs-down ml-3" onClick={decreaseVotes}></i>
          <p>{votes}</p>
        </div>
        <button type="button" class="btn btn-primary" onClick={deleteData}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default VideoCard;
