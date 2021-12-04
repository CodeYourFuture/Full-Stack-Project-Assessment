import React from "react";

const Cards = ({ data }) => {
    const id = data.url.substring(data.url.indexOf("=") + 1);
    const removeVideo = (event) => {
      event.preventDefault();
    };
    return (
      <div className="videoCards">
        <h4 className="videoTitle">{data.title}</h4>
        <iframe
          width="560"
          height="315"
          src={`https://www.youtube.com/embed/${id}`}
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
        <div className="votes">
          <span id="thumbsUp">
            <i class="fa fa-thumbs-up fa-2x" aria-hidden="true"></i>
          </span>
          <span id="votes-numb">
            <i>votes-numb</i>
          </span>
          <span id="thumbsDown">
            <i class="fa fa-thumbs-down fa-2x" aria-hidden="true"></i>
          </span>
        </div>
        <button id="remove" onClick={removeVideo}>
          Remove
        </button>
      </div>
    );
}

export default Cards;