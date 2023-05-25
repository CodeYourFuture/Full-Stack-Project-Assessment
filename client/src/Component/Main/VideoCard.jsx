import { useState } from "react";
import "./videoCard.scss";
import { GrLike } from "react-icons/gr";
import { GrDislike } from "react-icons/gr";

const VideoCard = ({ video }) => {
  const [rating, setRating] = useState(video.rating);

  const increseRating = () => {
    setRating(rating + 1);
  };

  const decreaseRating = () => {
    setRating(rating - 1);
  };

  return (
    <div className="card_container grid">
      <h3 className="video_title">{video.title}</h3>
      <iframe
        src={video.url.replace("watch?v=", "embed/")}
        title="video.title"
      ></iframe>
      <div className="flex">
        <button onClick={increseRating}>
          <GrLike className="icon" />
          {rating}
        </button>
        <button onClick={decreaseRating}>
          <GrDislike className="icon" />
        </button>
      </div>
      <button className="btn">REMOVE</button>
    </div>
  );
};

export default VideoCard;
