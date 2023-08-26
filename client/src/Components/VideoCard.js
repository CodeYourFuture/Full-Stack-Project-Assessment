import { useState } from "react";

const VideoCard = ({ video, removeVideo }) => {
  const [rating, setRating] = useState(video.rating);

  const addVote = () => {
    setRating(rating + 1);
    console.log(rating);
  };
  const deleteVote = () => {
    setRating(rating - 1);
    console.log(rating);
  };

  let url = video.url.substring(video.url.indexOf("=") + 1);
  return (
    <div className="one-video">
      <h3>{video.title}</h3>

      <iframe
        width="560"
        height="315"
        src={"https://www.youtube.com/embed/" + url}
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
      <div className="rating-flex">
        <button onClick={addVote}>Add Vote</button>
        <h4>Rating: {rating}</h4>
        <button onClick={deleteVote}>Delete Vote</button>
      </div>
      <button onClick={() => removeVideo(video)}>Remove video</button>
    </div>
  );
};

export default VideoCard;

// link.substring(link.indexOf("=") + 1, link.indexOf("&"));
