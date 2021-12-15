import React from "react";
import Buttons from "./Buttons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

const VideoCard = (props) => {
  return (
    <section className="card-group">
      <div className="card">
        <iframe
          width="560"
          height="315"
          title={props.title}
          src={`https://www.youtube.com/embed/${props.url.split("=")[1]}`}
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
              onClick={() => props.deleteCard(props.id)}
            />
          </button>
        </div>
      </div>
    </section>
  );
};

export default VideoCard;
