import React from "react";
import VoteButton from "./VoteButton";

const Video = ({ videos, handleDeleteClick }) => {
  return videos.map((video) => {
    const { id, title, url, rating } = video;
    const base_url = "https://www.youtube.com/embed/";
    return (
      <div key={id}>
        <h3 className="video-header">
          <span>{title}</span>
        </h3>

        <div className="wrapper">
          <div className="frame">
            <iframe
              src={base_url + url.slice(-11)}
              title="YouTube video player"
            ></iframe>
          </div>
          {rating ? <p>Rating: {rating}</p> : ""}
          <div>
            <VoteButton />
          </div>

          <div style={{ margin: "30px 0 0" }}>
            <button
              className="button"
              type="button"
              onClick={() => handleDeleteClick(video.id)}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    );
  });
};
//validate youtube url
//https://stackoverflow.com/questions/28735459/how-to-validate-youtube-url-in-client-side-in-text-box

export default Video;
