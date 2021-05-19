import React, {useState} from "react";

function VideoInfo(props) {
  const [vote, setVote] = useState(props.movie.rating);
  const upVote = () => {
    setVote(vote + 1);
  };

  const downVote = () => {
    setVote(vote - 1);
  };

  return (
    <li className="videoInfo" key={props.movie.id}>
      <h4>{props.movie.title}</h4>

      <iframe
        width="100%"
        height="auto"
        src={props.movie.url}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      ></iframe>

      <button className="btn btn-secondary" onClick={upVote}>
        UpVote
      </button>
      <span>{vote}</span>
      <button className="btn btn-secondary" onClick={downVote}>
        downVote
      </button>
      <button
        onClick={() => props.deleteHandler(props.movie.id)}
        className="btn btn-danger"
      >
        Delete
      </button>
    </li>
  );
}

export default VideoInfo;
