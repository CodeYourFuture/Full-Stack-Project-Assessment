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
    <ul className="videoInfo">
      {
        <li key={props.movie.id}>
          <h4>{props.movie.title}</h4>
          <iframe
            width="100%"
            height="auto"
            src="https://www.youtube.com/embed/dQw4w9WgXcQ"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          ></iframe>
          <button onClick={upVote}>UpVote</button>
          <span>{vote}</span>
          <button onClick={downVote}>downVote</button>
        </li>
      }
    </ul>
  );
}

export default VideoInfo;
