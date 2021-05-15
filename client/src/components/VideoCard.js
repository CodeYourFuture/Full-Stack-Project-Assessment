import React from "react";

const Card = ({ data }) => {
  const id = data.url.substring(data.url.indexOf("=") + 1);
  let title = data.title;
  if (title.length > 30) {
    title = `${title.substring(0, 30)}...`;
  }

  // EVENT HANDLERS
  const removeVideo = (event) => {
    event.preventDefault();
  };

  return (
    <div className="card">
      <h4 className="title">{title}</h4>
      <iframe
        src={`https://www.youtube.com/embed/${id}`}
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
      <div className="controls">
        <div className="votes">
          <span id="num-votes">
            <i>num-votes</i>
          </span>{" "}
          <span id="vote-up">
            <i className="fas fa-thumbs-up"></i>
          </span>
          <span id="vote-down">
            <i className="fas fa-thumbs-down"></i>
          </span>
        </div>
        <button id="remove" onClick={removeVideo}>
          Remove
        </button>
      </div>
    </div>
  );
};
export default Card;
