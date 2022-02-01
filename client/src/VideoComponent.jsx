import { useState } from "react";
const VideoComponent = (props) => {
  let [vote, setVote] = useState(0);
    return (
      <li
        className="video-list-item"
        id={`video-list-item-${props.index}`}
        key={`video-${props.index}-key`}
      >
        <h3>{props.video.title}</h3>
        <iframe
          width="560"
          height="315"
          // the commented out version allows the videos to run but youtube gets upset when
          // you ask for so much :P
          src={props.video.url.replace("watch?v=", "embed/")}
          // src={video.url}
          title={props.video.title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
        <p>Votes: {vote}</p>
        <button
          className="vote-button"
          onClick={() => {
            setVote((vote += 1));
          }}
        >
          Vote +
        </button>
        <button
          className="vote-button"
          onClick={() => {
            setVote((vote -= 1));
          }}
        >
          Vote -
        </button>
        <button
          onClick={() => {
            props.remove(props.video.id);
          }}
        >
          Remove Listing
        </button>
      </li>
    );
}
export default VideoComponent;