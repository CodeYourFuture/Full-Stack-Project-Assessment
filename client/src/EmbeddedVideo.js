import React from "react";

function EmbeddedVideo({ video }) {
  let url;
  if (video.video_url) {
    url = video.video_url.replace("watch?v=", "embed/");
  }
  return (
    <iframe
      className="embeddedVideo"
      title={video.video_title}
      height={"300"}
      src={url}
      alt={video.video_title}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media;"
    />
  );
}

export default EmbeddedVideo;
