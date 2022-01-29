import React from "react";
import VideoVotes from "./VideoVotes";

export default function Video(props) {
  const deleteHandler = () => {
    // Delete handler that uses a prop function which takes prop VideoId as parameter
    props.deleteVideo(props.videoId);
  };

  const youTubeId = props.Url.split("=")[1];

  return (
    <div>
      <div>
        <h4>{props.title}</h4>
        <h5>{props.rating}</h5>
        <VideoVotes />
        <iframe
          width="560"
          height="315"
          src={`https://www.youtube.com/embed/${youTubeId}`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
        <button
          onClick={deleteHandler}
          type="button"
          className="btn btn-primary mt-3"
        >
          Delete Video
        </button>
      </div>
    </div>
  );
}
