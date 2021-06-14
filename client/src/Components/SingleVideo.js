import React from "react";
import VideoVotes from "./VideoVotes";
import VideoDelete from "./VideoDelete";

const SingleVideo = ({ video }) => {
  console.log(video.url);
  function youTubeGetID(url) {
    url = url.split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
    return url[2] !== undefined ? url[2].split(/[^0-9a-z_\-]/i)[0] : url[0];
  }

  const videoID = youTubeGetID(video.url);
  console.log(videoID)
  video.url=`https://www.youtube.com/embed/${videoID}`
  return (
    <>
      <VideoVotes />
      <iframe
        width="560"
        height="315"
        src={video.url}
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>

      <VideoDelete />
    </>
  );
};

export default SingleVideo;
