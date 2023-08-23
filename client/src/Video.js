import { useState } from "react";
function Video(props) {
  const [rating, setRating] = useState(props.rating);
  return (
    <div className="singleVideo">
      <iframe
        title={props.title}
        src={props.url}
        className="videoFrame"
        width="560"
        height="315"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      >
        {" "}
      </iframe>
      <h5>{props.title}</h5>
      <p>
        <span>
          rating: <span>{rating}</span>
          <span className="rating">
            <button
              onClick={(e) => {
                let x = e.target.parentNode.parentNode.children[0].innerText;
                x++;
                setRating(x);
              }}
            >
              Up
            </button>
            <button
              onClick={(e) => {
                let x = e.target.parentNode.parentNode.children[0].innerText;
                x--;

                setRating(x);
              }}
            >
              Down
            </button>
          </span>
        </span>
        <button
          onClick={(e) => {
            props.onclick(e.target.parentNode.parentNode.children[1].innerText);
          }}
          className="btn"
        >
          remove video
        </button>
      </p>
    </div>
  );
}

export default Video;
