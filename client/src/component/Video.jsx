import React from "react";


const Video=({video,upVote,downVote,removeVideo})=>{
    console.log(video);
     if (!video) {
       return null;
     }
    return (
      <div className="video-card">
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
          <p className="vote-score">Votes :{video.rating ?? 0}</p>

          <button className="vote-button" onClick={upVote}>
            UpVote
          </button>
          <button className="vote-button" onClick={downVote}>
            DownVote
          </button>
          <button className="remove-button" onClick={removeVideo}>
            Rmove
          </button>
        </section>
      </div>
    );
}










export default Video;