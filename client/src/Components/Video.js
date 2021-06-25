import { IoThumbsDown, IoThumbsUp } from "react-icons/io5";
import { useState } from "react";

const Video = ({ video, handleDelete }) => {
  const [vote, setVote] = useState(0);

  return (
    <div className= "m-3">
      <h3>{video.title}</h3>
      <div>
        <button
          name="increaseVote"
          aria-label="Like video"
          className="btn btn-danger mx-2"
          onClick={() => setVote(vote - 1)}
        >
          <IoThumbsDown />
        </button>
        <label>{vote} Votes </label>
        <button
          name="decreaseVote"
          aria-label="Dislike video"
          className="btn btn-danger mx-2"
          onClick={() => setVote(vote + 1)}
        >
          <IoThumbsUp />
        </button>
      </div>
      <iframe
        width="560"
        height="315"
        src={`https://www.youtube.com/embed/${video.url.split("=")[1]}`}
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
      <div>
        <button onClick={() => handleDelete(video.id)}>Delete</button>
      </div>
    </div>
  );
};
export default Video;
