import React, { useState } from "react";

function VideoInfo({ videos, setVideos, video }) {
  const [votes, setVotes] = useState(0);

  function handleDeleteVideo(videoID) {
    const updatedVideos = videos.filter((video) => video.id !== videoID);
    setVideos(updatedVideos);
  }

  return (
    <div>
      <div>
        <h2>{video.title}</h2>
        <iframe
          width="300"
          height="250"
          src={`https://www.youtube.com/embed/${video.videoID}`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
        <aside>
          <span>{votes} votes</span>
          <button
            onClick={() => {
              setVotes((c1) => c1 + 1);
            }}
          >
            Up Vote
          </button>
          <button
            onClick={() => {
              setVotes((c2) => c2 - 1);
            }}
          >
            Down Vote
          </button>
        </aside>
        <button onClick={() => handleDeleteVideo(video.id)}>
          Remove Video
        </button>
      </div>
    </div>
  );
}

export default VideoInfo;
