import React, {useState} from "react";
import DeleteVideo from "./DeleteVideo.js";
import VoteScore from "./VoteScore.js";


const Video = ({ video, handleDelete, setListOfVideos }) => {


  return (
    <div className="video-container">
      <h2>{video.title}</h2>
      <iframe src={video.url} title={video.title} allowFullScreen>
        {" "}
        allowFullScreen
      </iframe>
      <p>Number of Votes: {video.rating} </p>
      <DeleteVideo video={video} handleDelete={handleDelete} />
      <VoteScore video={video}/>
    </div>
  );
};

export default Video;
