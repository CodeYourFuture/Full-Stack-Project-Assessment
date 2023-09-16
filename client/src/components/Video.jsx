import { useState } from "react";

function Video({ videoObj, deleteVideo }) {
  const videoId = getVideoIdFromUrl(videoObj.url);
  const [vote, setVote] = useState(videoObj.rating);



  const updateVote = (increment) => {
    const newRating = videoObj.rating + increment;

    fetch(`https://node-server-full-stack.onrender.com/videos/${videoObj.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ newRating }),
    })
    .then((res) => {
        if (!res.ok) throw new Error(res.statusText);
        return res.json();
    })
    .then(() => {
        if (increment === 1) {
            setVote(vote + 1);
        } else if (increment === -1 && vote > 0) {
            setVote(vote - 1);
        }
    })
    .catch((error) => console.error("Error updating vote:", error));
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
          <i className="fa-solid fa-thumbs-up" onClick={()=>updateVote(1)}></i>
          <p>{vote}</p>
          <i className="fa-solid fa-thumbs-down" onClick={()=>updateVote(-1)}></i>
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
    return url.split("v=")[1];
  }
  return null;
}
