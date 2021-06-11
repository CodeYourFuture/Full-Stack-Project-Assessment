import "./App.css";
import { useState, useEffect } from "react";

function Video({ id, title, url, rating, deleteVideo }) {
  // setting number of votes to be rating initially
  let [votes, setVotes] = useState();
  useEffect(() => {
    setVotes(rating);
  }, [rating]);
  // votes
  const vote = (newRating, videoId, event) => {
    // check using class name  then increase/decrease votes by 1
    if (event.target.className === "fa fa-thumbs-up") {
      newRating = ++votes;
    }
    if (event.target.className === "fa fa-thumbs-down") {
      newRating = --votes;
    }

    fetch(`https://get-my-videos.herokuapp.com/${videoId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ rating: newRating }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setVotes((votes) => data.rating);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div id={id} className="oneVideo">
      <h5>{title}</h5>
      {/* separate div for votes  */}
      <div className="votes">
        <i
          className="fa fa-thumbs-up"
          onClick={(event) => vote(rating, id, event)}
        ></i>
        <p className="voteCount">{votes}</p>
        <i
          className="fa fa-thumbs-down"
          onClick={(event) => vote(rating, id, event)}
        ></i>
      </div>
      {/* iframe for video  */}
      <iframe
        src={url.replace("watch?v=", "embed/")}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
      {/* delete button */}
      <div>
        <button className=" btn btn-primary" onClick={() => deleteVideo(id)}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default Video;
