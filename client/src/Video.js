import "./App.css";
import { useState } from "react";

function Video({ id, title, url, rating, deleteVideo }) {
  let [numberOfVotes, setNumberOfVotes] = useState(rating);

  // votes
  function vote(event) {
    event.preventDefault();
    if (event.target.className === "fa fa-thumbs-up") {
      setNumberOfVotes(++numberOfVotes);
    } else {
      setNumberOfVotes(--numberOfVotes);
    }
  }
  return (
    <div id={id} className="oneVideo">
      <h5>{title}</h5>
      {/* separate div for votes  */}
      <div className="votes">
        <i className="fa fa-thumbs-up" onClick={vote}></i>
        <p className="voteCount">{numberOfVotes}</p>
        <i className="fa fa-thumbs-down" onClick={vote}></i>
      </div>
      {/* iframe for video  */}
      <iframe
        width="400"
        height="250"
        src={url.replace("watch?v=", "embed/")}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
      {/* delete button */}
      <div>
        <button className=" btn btn-primary" onClick={deleteVideo}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default Video;
