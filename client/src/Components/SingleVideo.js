import React from "react";
import VideoVotes from "./VideoVotes";

const SingleVideo = ({ video, videoData, setVideoData }) => {
  function youTubeGetID(url) {
    url = url.split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
    return url[2] !== undefined ? url[2].split(/[^0-9a-z_\-]/i)[0] : url[0];
  }

  const videoID = youTubeGetID(video.url);
  video.url = `https://www.youtube.com/embed/${videoID}`;

  return (
    <div className="d-flex flex-column m-5 single-video">
      <div className="title-video d-flex m-5 align-content-center justify-content-center">
        <h4 className="text-center">{video.title}</h4>
      </div>
      <iframe
        width="560"
        height="315"
        src={video.url}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="m-3"
      ></iframe>
      <VideoVotes
        video={video}
        videoData={videoData}
        setVideoData={setVideoData}
      />

    </div>
  );
};

export default SingleVideo;
