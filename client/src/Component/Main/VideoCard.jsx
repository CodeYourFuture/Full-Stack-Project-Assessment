import { useState } from "react";
import { GrLike } from "react-icons/gr";
import { GrDislike } from "react-icons/gr";

const VideoCard = ({ video, deleteHandler }) => {
  const [rating, setRating] = useState(video.rating);

  const increseRating = () => {
    setRating(rating + 1);
  };

  const decreaseRating = () => {
    setRating(rating - 1);
  };

  return (
    <div className="card_container flex">
      <h3 className="video_title">{video.title}</h3>
      <iframe
        src={video.link
          .replace("watch?v=", "embed/")
          .replace("youtube.com", "youtube-nocookie.com")}
        title={video.title}
      ></iframe>
      <div className="flex">
        <span onClick={increseRating}>
          <GrLike className="icon" />
        </span>
        <span>{rating}</span>
        <span onClick={decreaseRating}>
          <GrDislike className="icon" />
        </span>
      </div>
      <button className="btn" onClick={() => deleteHandler(video.id)}>
        REMOVE
      </button>
    </div>
  );
};

export default VideoCard;
