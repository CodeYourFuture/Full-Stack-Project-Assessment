import { useState } from "react";

const VideoCard = ({ video, removeVideo }) => {
  const [rating, setRating] = useState(video.rating);

  const addVote = () => {
    setRating(rating + 1);
  };
  const deleteVote = () => {
    setRating(rating - 1);
  };

  let url = video.url.substring(video.url.indexOf("=") + 1);
  return (
    <div className=" col-lg-4 col-sm-12 text-center mt-5">
      <h4>{video.title}</h4>

      <iframe
        width="370"
        height="200"
        src={"https://www.youtube.com/embed/" + url}
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
      <div className="d-flex align-items-center justify-content-around">
        <button className="btn btn-outline-success" onClick={addVote}>
          Add Vote
        </button>
        <h4>Rating: {rating}</h4>
        <button className="btn btn-outline-warning" onClick={deleteVote}>
          Delete Vote
        </button>
      </div>
      <button
        className="btn btn-danger btn-lg btn-block mt-2 p-1"
        onClick={() => removeVideo(video)}
      >
        Remove video
      </button>
    </div>
  );
};

export default VideoCard;

// link.substring(link.indexOf("=") + 1, link.indexOf("&"));
