import React from "react";

const MainCard = ({ video, onDelete, onVote }) => {
  const videoId = video.url.split("v=")[1];

  return (
    <div>
      <h3>{video.title}</h3>
      <iframe
        className="iframe"
        width="390"
        height="315"
        src={`https://www.youtube.com/embed/${videoId}`}
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture web-share"
        allowfullscreen
      ></iframe>
      <p className="likes">Likes: {video.rating}</p>
      <button>
        <i
          onClick={() => onVote(video.id, "up")}
          type="button"
          class="fa fa-thumbs-up"
        ></i>
      </button>
      <button>
        <i
          onClick={() => onVote(video.id, "down")}
          type="button"
          class="fa fa-thumbs-down"
        ></i>
      </button>
      <div>
        <button
          onClick={() => onDelete(video.id)}
          
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default MainCard;
