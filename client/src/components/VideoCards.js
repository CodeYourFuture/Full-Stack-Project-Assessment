import React, { useState } from "react";
import Buttons from "./Buttons";
import data from "../exampleresponse.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

const VideoCards = () => {
  const [videos, setVideos] = useState(data);
  const handleDelete = (id) => {
    const filteredVideos = videos.filter((video) => video.id !== id);
    setVideos(filteredVideos);
  };
  return (
    <section className="card-group">
      {videos.map((video, index) => (
        <div className="card">
          <iframe
            width="560"
            height="315"
            src={`https://www.youtube.com/embed/${video.url.split("=")[1]}`}
            title={video.title}
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
            key={index}
          ></iframe>
          <div className="card-body">
            <h5 className="card-title">{video.title}</h5>
            <p>Rating: {video.rating}</p>
          </div>
          <div>
            <Buttons />
            <FontAwesomeIcon
              icon={faTrashAlt}
              size="2x"
              onClick={() => handleDelete(video.id)}
            />
          </div>
        </div>
      ))}
    </section>
  );
};

export default VideoCards;
