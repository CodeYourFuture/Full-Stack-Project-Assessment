import React from "react";
import VideoVotes from "./VideoVotes";
import VideoDelete from "./VideoDelete";

const SingleVideo = ({ video, videoData, setVideoData }) => {
  function youTubeGetID(url) {
    url = url.split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
    return url[2] !== undefined ? url[2].split(/[^0-9a-z_\-]/i)[0] : url[0];
  }

  const videoID = youTubeGetID(video.url);
  video.url = `https://www.youtube.com/embed/${videoID}`;


  return (
    <>
      <VideoVotes video={video}/>
      <iframe
        width="560"
        height="315"
        src={video.url}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>

      <VideoDelete
        video={video}
        videoData={videoData}
        setVideoData={setVideoData}
      />
    </>
  );
};

export default SingleVideo;
