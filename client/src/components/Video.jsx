import { useState } from "react";

function Video({ videoObj, deleteVideo }) {
  const videoId = getVideoIdFromUrl(videoObj.url);
  const [ vote, setVote ] = useState(videoObj.rating);

  const fetchVideosUrl = 'http:/ec2-3-10-215-23.eu-west-2.compute.amazonaws.com:5050';

  const updateVote = (increment) => {
    const newRating = vote + increment;

    fetch(`${fetchVideosUrl}/videos/${videoObj.id}`, {
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
        setVote(vote + increment);
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
        <h3 className="card-title">{videoObj.title}</h3>
        <p className="card-text">Requested At: {date}</p>
        <div className="buttons">
          <i className="fa-solid fa-thumbs-up" onClick={() => updateVote(1)}></i>
          <p>{vote}</p>
          <i className="fa-solid fa-thumbs-down" onClick={() => updateVote(-1)}></i>
          <button onClick={() => deleteVideo(videoObj.id)} className=" btn-danger">
            <i className="fa fa-trash-o"></i>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Video;

function getVideoIdFromUrl(url) {
  const videoIdIndex = url.indexOf("v=");
  return videoIdIndex !== -1 ? url.substring(videoIdIndex + 2) : null;
}
