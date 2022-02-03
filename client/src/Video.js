import React from "react";
import VideoVotes from "./VideoVotes";

export default function Video(props) {
  const deleteHandler = () => {
    // Delete handler that uses a prop function which takes prop VideoId as parameter
    props.delete(props.videoId);
  };

  // const youTubeId = props.Url.split("=")[1];

  return (
    <ul className="video">
      <div className="video-info">
        <li>
          <h4>{props.title}</h4>
        </li>
        <li>
          <VideoVotes />
        </li>
      </div>
      <li>
        <iframe
          width="560"
          height="315"
          src={props.Url}
          title={props.title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </li>
      <li>
        <h5>Rating: {props.rating}</h5>
      </li>
      <li>
        <button
          onClick={deleteHandler}
          type="button"
          className="btn btn-danger"
        >
          Delete Video
        </button>
      </li>
    </ul>
  );
}
