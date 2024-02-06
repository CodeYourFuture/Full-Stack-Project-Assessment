import { useState } from "react";

const VideoCard = ({ video, removeVideo }) => {
  const [rating, setRating] = useState(video.rating);

  const addVote = () => {
    setRating(rating + 1);
    fetch(`http://localhost:3006/videos/${video.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ rating: rating + 1 }),
    })
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
  };
  const deleteVote = () => {
    setRating(rating - 1);
    fetch(`http://localhost:3006/videos/${video.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ rating: rating - 1 }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
  };

  let url = video.url.replace("watch?v=", "embed/");
  return (
    <div className=" col-lg-4 col-sm-12 text-center mt-5">
      <h4>{video.title}</h4>

      <iframe
        width="370"
        height="200"
        src={url}
        title="YouTube video player"
        frameBorder="0"
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
