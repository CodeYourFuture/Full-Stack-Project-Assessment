import React from "react";

const REGEXP =
  /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;

const getIdFromYoutubeUrl = (link) => {
  return link.match(REGEXP) ? link.match(REGEXP)[1] : false;
};

const Video = ({ video }) => {
  const videoId = getIdFromYoutubeUrl(video.url);
  const videoUrl = `https://youtube.com/embed/${videoId}`;

  return (
    <iframe
      width="426"
      height="240"
      src={videoUrl}
      title={video.title}
      alt={video.title}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    ></iframe>
  );
};
export default Video;
