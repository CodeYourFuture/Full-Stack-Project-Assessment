import React, { useState } from "react";

const Cards = (props) => {
  
  const [vote, setVote] = useState(0);
  // const [video, setVideo] = useState(true);

  // const data = props.video.url.substring(props.video.url.indexOf("=") + 1);

  const handleDelete = (id) => {
    const newData = props.video.filter((e) => e.id !== id);
    props.setVideo(newData);
  };

  return (
    <div className="video-cards">
      {props.video.map((eachVideo, index) => (
        <div className="response" key={index}>
          <h4 className="videoTitle">{eachVideo.title}</h4>

          <iframe
            width="300"
            height="192"
            src={`https://www.youtube.com/embed/${eachVideo.url.substring(
              eachVideo.url.indexOf("=") + 1
            )}`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>

          <div className="votes">
            <span
              id="thumbsUp"
              aria-label="Like Video"
              onClick={() => setVote(vote + 1)}
            >
              <i className="fa fa-thumbs-up fa-2x" aria-hidden="true"></i>
            </span>

            <span id="votes-numb">{vote} Votes</span>

            <span
              id="thumbsDown"
              aria-label="Dislike"
              onClick={() => setVote(vote - 1)}
            >
              <i className="fa fa-thumbs-down fa-2x" aria-hidden="true"></i>
            </span>
          </div>

          <div>
            <button
              type="button"
              id="remove"
              onClick={() => handleDelete(eachVideo.id)}
            >
              Remove
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Cards;
