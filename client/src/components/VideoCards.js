import React from "react";
import Buttons from "./Buttons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

const VideoCards = (props, { videoData, setVideoData }) => {
  const handleDelete = (id) => {
    const filteredVideos = videoData.filter((video) => video.id !== id);
    setVideoData(filteredVideos);
  };
  return (
    <section className="card-group">
      {/*  {videoData.map((video, index) => ( */}
      <div className="card" /* key={index} */>
        <iframe
          className="video"
          width="560"
          height="315"
          title={props.title}
          src={`https://www.youtube.com/embed/${video.url.split("=")[1]}`}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
        <div className="card-body">
          <h5 className="card-title">{props.title}</h5>
          <p>Rating: {props.rating}</p>
        </div>
        <div>
          <Buttons />
          <button>
            <FontAwesomeIcon
              aria-label="button"
              role="button"
              icon={faTrashAlt}
              size="2x"
              onClick={() => handleDelete(props.id)}
            />
          </button>
        </div>
      </div>
      {/* ))} */}
    </section>
  );
};

export default VideoCards;
