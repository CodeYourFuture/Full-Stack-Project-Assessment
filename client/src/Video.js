import { useState } from "react";
function Video(props) {
  const [rating, setRating] = useState(props.rating);
  return (
    <div className="singleVideo">
      <iframe
        title={props.title}
        src={props.url}
        className="videoFrame i-focus"
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
        <span className="rating">
          <i
            className="fa-solid fa-thumbs-up fa-lg t-up"
            onClick={(e) => {
              let x = e.target.parentNode.children[1].innerText;
              x++;
              setRating(x);
            }}
          ></i>{" "}
          <span>{!rating ? 0 : rating}</span>
          <i
            className="fa-solid fa-thumbs-down fa-lg t-down"
            onClick={(e) => {
              let x = e.target.parentNode.children[1].innerText;
              x--;
              setRating(x);
            }}
          ></i>
        </span>

        <button
          onClick={(e) => {
            props.delete(e.target.parentNode.parentNode.children[1].innerText);
          }}
          className="btn"
        >
          <i class="fa-solid fa-trash-can"></i>
        </button>
      </p>
    </div>
  );
}

export default Video;
