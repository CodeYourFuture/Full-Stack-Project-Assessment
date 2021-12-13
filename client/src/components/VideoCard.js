import React, { useState } from "react";
import VideoVote from "./VideoVote";
import fetchVideos from "../utils/fetchVideos";
import deleteVideo from "../utils/deleteVideo";
export default function VideoCard({ videos, setVideos }) {
  function handleDelete(id) {
    deleteVideo(id, setVideos);
  }

  // //order the data according to the votes
  const [orderVotesAsc, setOrderVotesAsc] = useState(true);
  function changeOrder() {
    if (orderVotesAsc) {
      fetchVideos("?order=asc", setVideos);
    } else {
      fetchVideos("?order=desc", setVideos);
    }
    setOrderVotesAsc((prev) => !prev);
  }
  //take youtube id from url
  const videoCards = videos.map((video) => {
    const youtubeID = video.url.slice(
      video.url.indexOf("v=") + 2
    );
    return (
      <li key={video.id} className="videoCard">
        <iframe
          width="360"
          height="215"
          src={`https://www.youtube.com/embed/${youtubeID}`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
        <p>{video.title}</p>
        <VideoVote rating={video.rating} id={video.id} />
        <button
          className="deleteButton"
          onClick={() => handleDelete(video.id)}
        >
          DELETE
        </button>
      </li>
    );
  });

  return (
    <ul>
      <button className="orderVideos" onClick={changeOrder}>
        LIKE <i className="fa fa-sort" />
      </button>
      {videoCards}
    </ul>
  );
}
