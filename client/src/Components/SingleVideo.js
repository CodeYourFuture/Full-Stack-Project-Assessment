import React from "react";
import VideoVotes from "./VideoVotes";

const SingleVideo = ({
  video,
  videoData,
  setVideoData,
  setIsDataUpdating,
  isDataUpdating,
}) => {
  function youTubeGetID(url) {
    url = url.split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
    return url[2] !== undefined ? url[2].split(/[^0-9a-z_\-]/i)[0] : url[0];
  }

  const videoID = youTubeGetID(video.url);
  video.url = `https://www.youtube.com/embed/${videoID}`;
  return (
    <div className="d-flex flex-column m-3 single-video">
      <div className="title-video d-flex m-5 align-content-center justify-content-center">
        <p className="text-center font-weight-bold lead">{video.title}</p>
      </div>
      <div className="date-video d-flex justify-content-end mr-3 ">
        <p className="text-center font-italic">Date added: {video.dateadded}</p>
      </div>
      <iframe
        title={video.title}
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
        setIsDataUpdating={setIsDataUpdating}
        isDataUpdating={isDataUpdating}
      />
    </div>
  );
};

export default SingleVideo;
