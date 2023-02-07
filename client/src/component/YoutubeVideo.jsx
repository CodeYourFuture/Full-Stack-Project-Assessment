import React from "react";

const Video=({video,increasementVote,decreasementVote,removeVideo})=>{
    // console.log(video);
     if (!video) {
       return null;
     }
    return (
      <div className="container-card">
        <h2 className="video-title">{video.title}</h2>
        <iframe
          className="video-frame"
          title={video.title}
          width="560"
          height="315"
          src={`https://www.youtube.com/embed/${video.url.split("v=")[1]}`}
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
           allowFullScreen
        ></iframe>{" "}
        <section className="vote-section">
          <p className="vote-score">Rating :{video.rating}</p>

          <button className="vote-button" onClick={increasementVote}>
            + vote
          </button>
          <button className="vote-button" onClick={decreasementVote}>
            - vote
          </button>
          <button className="delete-button" onClick={removeVideo}>
            Delete
          </button>
        </section>
      </div>
    );
}



export default Video;