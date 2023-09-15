import { useState } from "react";

function Video({ videoObj, deleteVideo }) {
  const videoId = getVideoIdFromUrl(videoObj.url);
  const [vote, setVote] = useState(videoObj.rating);

  const voteIncrease = () => {
    const newRating = videoObj.rating + 1;
    fetch(`https://node-server-full-stack.onrender.com/videos/${videoObj.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ newRating }),
    })
      .then((res) => res.json())
      .then(() => {
        setVote(vote + 1);
      });
    console.log(newRating);
  };

  const voteDecrease = () => {
    const newRating = videoObj.rating - 1;
    fetch(`https://node-server-full-stack.onrender.com/videos/${videoObj.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ newRating }),
    })
      .then((res) => res.json())
      .then(() => {
        setVote(() => (vote > 0 ? vote - 1 : 0));
      });
    console.log(newRating);
  };

  const date = new Date().toDateString();

  return (
    <div className="card">
      <iframe
        src={`https://www.youtube.com/embed/${videoId}`}
        frameBorder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        title="YouTube video player"
        allowFullScreen
        height="300px"
      ></iframe>
      <div className="card-body">
        <h5 className="card-title">{videoObj.title}</h5>
        <p className="card-text">Requested At: {date}</p>
        <div className="buttons">
          <button onClick={voteIncrease} className="btn btn-primary">
            &#128077;
          </button>
          <p>{vote}</p>
          <button onClick={voteDecrease} className="btn btn-warning">
            &#128078;
          </button>
          <button onClick={() => deleteVideo(videoObj.id)} className="btn btn-danger">
            <i className="fa fa-trash-o"></i>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Video;

function getVideoIdFromUrl(url) {
  if (url && typeof url === "string" && url.includes("v=")) {
    const videoId = url.split("v=")[1];
    return videoId;
  } else {
    return null;
  }
}
