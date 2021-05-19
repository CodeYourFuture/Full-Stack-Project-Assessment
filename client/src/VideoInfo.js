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
      <h4 className="text-center">{props.movie.title}</h4>

      <iframe
        width="100%"
        height="auto"
        src={props.movie.url}
        title={props.movie.title}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      ></iframe>

      <button className="btn btn-primary m-2" onClick={upVote}>
        UpVote
      </button>
      <span className="m-4">{vote}</span>
      <button className="btn btn-primary m-2" onClick={downVote}>
        downVote
      </button>
      <button
        onClick={() => props.deleteHandler(props.movie.id)}
        className="btn btn-danger m-2"
      >
        Delete
      </button>
    </li>
  );
}

export default VideoInfo;
